import copy
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import zipfile

import pack_docs as p


def jar(files):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w") as archive:
        for name, body in files.items():
            archive.writestr(name, body)
    return buffer.getvalue()


def descriptor(mod_id="example", version="1.0", extra=""):
    return f'''modLoader="javafml"
loaderVersion="[1,)"
[[mods]]
modId="{mod_id}"
version="{version}"
description="A useful mod."
{extra}
'''


class CatalogueTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def fixture(self):
        data = jar({"META-INF/neoforge.mods.toml": descriptor()})
        (self.root / "mods").mkdir()
        (self.root / "mods/example.jar").write_bytes(data)
        self.index({"mods/example.jar": data, "options.txt": b"gamma:1"})
        return p.capture(self.root, [], False)

    def index(self, files):
        lines = ['hash-format="sha256"']
        for name, data in files.items():
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            lines += [f'[[files]]\nfile="{name}"\nhash="{p.digest(data)}"']
        index = "\n".join(lines).encode()
        (self.root / "index.toml").write_bytes(index)
        (self.root / "pack.toml").write_text(f'''name="Fixture"
version="1.0"
[index]
file="index.toml"
hash-format="sha256"
hash="{p.digest(index)}"
[versions]
minecraft="1.21.1"
neoforge="21.1.244"
''')

    def test_complete_index_hash_chain_and_unindexed_exclusion(self):
        first = self.fixture()
        (self.root / "mods/unindexed.jar").write_bytes(b"not part of pack")
        self.assertEqual(first, p.capture(self.root, [], False))
        (self.root / "options.txt").write_text("changed")
        with self.assertRaisesRegex(ValueError, "Hash mismatch"):
            p.inputs(self.root)

    def test_manifest_hash_rejects_replaced_index(self):
        self.fixture()
        (self.root / "index.toml").write_text("files=[]")
        with self.assertRaisesRegex(ValueError, "Hash mismatch"):
            p.inputs(self.root)

    def test_documentation_accidentally_indexed_is_refused(self):
        self.index({"docs/catalogue.json": b"{}"})
        with self.assertRaisesRegex(ValueError, "documentation was indexed"):
            p.inputs(self.root)

    def test_capture_dry_run_has_no_writes(self):
        self.fixture()
        before = sorted(str(path) for path in self.root.rglob("*"))
        p.main(["--pack", str(self.root), "capture"])
        self.assertEqual(before, sorted(str(path) for path in self.root.rglob("*")))

    def test_writer_lock_and_failure_cleanup(self):
        with self.assertRaisesRegex(RuntimeError, "failure"):
            with p.writer(self.root):
                with self.assertRaisesRegex(ValueError, "Another documentation"):
                    with p.writer(self.root):
                        self.fail("second writer entered")
                raise RuntimeError("failure")
        self.assertFalse((self.root / ".pack-docs.lock").exists())

    def test_path_escape_refused(self):
        for value in ("../private", "C:/private", "mods/../../private", "/private", "mods\\private"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                p.safe(self.root, value)

    def test_wrong_jar_never_used_by_filename(self):
        wrong = self.root / "example.jar"
        wrong.write_bytes(b"wrong")
        with self.assertRaisesRegex(ValueError, "Missing verified"):
            p.acquire({"filename": "example.jar", "download": {"hash-format": "sha256", "hash": p.digest(b"right")}},
                      {"example.jar": [wrong]}, self.root / "cache", False)

    def test_nested_modules_and_uppercase_dependency_kinds(self):
        child = jar({"META-INF/neoforge.mods.toml": descriptor("library", "2")})
        data = jar({"META-INF/neoforge.mods.toml": descriptor(extra='[[dependencies.example]]\nmodId="library"\ntype="REQUIRED"\nside="CLIENT"\nversionRange="[2,3)"'),
                    "META-INF/jarjar/metadata.json": json.dumps({"jars": [{"path": "META-INF/jarjar/lib.jar"}]}),
                    "META-INF/jarjar/lib.jar": child})
        modules, evidence = p.archive_metadata(data)
        self.assertEqual(modules[0]["dependencies"][0]["kind"], "required")
        self.assertEqual(modules[0]["dependencies"][0]["side"], "client")
        self.assertTrue(modules[1]["embedded"])
        self.assertIn("!/META-INF/neoforge.mods.toml", modules[1]["descriptor"])
        self.assertTrue(any(e["body"].startswith("modLoader") for e in evidence))

    def test_manifest_version_substitution_and_continuation(self):
        data = jar({"META-INF/neoforge.mods.toml": descriptor(version="${file.jarVersion}"),
                    "META-INF/MANIFEST.MF": "Manifest-Version: 1.0\r\nImplementation-Version: 1.2.\r\n 3\r\n\r\n"})
        self.assertEqual(p.archive_metadata(data)[0][0]["version"], "1.2.3")

    def test_forge_optional_and_neoforge_priority(self):
        forge = descriptor(extra='[[dependencies.example]]\nmodId="other"\nmandatory=false')
        self.assertEqual(p.archive_metadata(jar({"META-INF/mods.toml": forge}))[0][0]["dependencies"][0]["kind"], "optional")
        both = jar({"META-INF/mods.toml": forge, "META-INF/neoforge.mods.toml": descriptor("neo")})
        self.assertEqual(p.archive_metadata(both)[0][0]["id"], "neo")

    def test_fabric_dependency_arrays(self):
        data = jar({"fabric.mod.json": json.dumps({"id": "mod", "version": "2", "depends": {"lib": [">=1", "<3"]}, "recommends": {"optional": "*"}})})
        module = p.archive_metadata(data, "fabric")[0][0]
        self.assertEqual([d["kind"] for d in module["dependencies"]], ["required", "optional"])
        self.assertIn(">=1", module["dependencies"][0]["range"])

    def test_unscoped_dependencies_not_promoted_to_required(self):
        modules, _ = p.archive_metadata(jar({"META-INF/neoforge.mods.toml": descriptor(extra='[[dependencies]]\nmodId="other"')}))
        self.assertEqual(modules[0]["dependencies"][0]["kind"], "unscoped")

    def test_reverse_edges_separate_optional_and_required(self):
        snapshot = self.fixture()
        library = copy.deepcopy(snapshot["artifacts"][0])
        library["key"], library["name"] = "library", "Library"
        library["modules"][0]["id"] = "library"
        snapshot["artifacts"].append(library)
        snapshot["artifacts"][0]["modules"][0]["dependencies"] = [{"id": "library", "kind": "optional", "range": "*", "side": "both"}]
        self.assertEqual(p.reverse(library, snapshot, "required"), [])
        self.assertEqual(len(p.reverse(library, snapshot, "optional")), 1)

    def test_chapter_links_rebase_current_and_historical_catalogues(self):
        snapshot = self.fixture()
        current = p.markdown_bundle(snapshot)
        self.assertIn("docs/mods/e.md#mod-", current["MODLIST.md"])
        self.assertIn("../../mods/example.jar", current["docs/mods/e.md"])
        historical = p.markdown_bundle(snapshot, "changelogs/modlist/old.md", "changelogs/modlist/old", "changelogs/snapshots/old.json")
        self.assertIn("old/e.md#mod-", historical["changelogs/modlist/old.md"])
        self.assertIn("../../../mods/example.jar", historical["changelogs/modlist/old/e.md"])
        self.assertIn("../../snapshots/old.json", historical["changelogs/modlist/old/e.md"])

    def test_diff_same_version_artifact_and_config_changes(self):
        before = self.fixture()
        after = copy.deepcopy(before)
        after["artifacts"][0]["download"]["hash"] = "changed"
        after["inputs"]["files"]["options.txt"] = "changed"
        result = p.changes(before, after)
        self.assertIn("version label unchanged", result)
        self.assertIn("Changed: options.txt", result)

    def test_local_filename_change_keeps_mod_identity(self):
        before = self.fixture()
        data = (self.root / "mods/example.jar").read_bytes()
        self.index({"mods/example-1.0.jar": data})
        after = p.capture(self.root, [], False)
        self.assertEqual(before["artifacts"][0]["key"], after["artifacts"][0]["key"])
        self.assertIn("### Updated", p.changes(before, after))
        self.assertNotIn("### Removed", p.changes(before, after))

    def test_markdown_escapes_untrusted_text(self):
        self.assertEqual(p.md("<script>|[x]\nhi"), r"\<script\>\|\[x\] hi")
        self.assertNotIn("🐕", p.inline("Companion 🐕"))

    def test_no_descriptor_stays_unknown(self):
        self.assertEqual(p.archive_metadata(jar({"data.txt": "data"})), ([], []))

    def test_release_history_and_stale_projections(self):
        snapshot = self.fixture()
        p.atomic(self.root / "docs/catalogue.json", p.encoded(snapshot))
        notes = self.root / "notes.md"
        notes.write_text("Documentation baseline; no gameplay change.")
        args = ["--pack", str(self.root), "release", "--id", "baseline", "--date", "2026-09-08", "--notes", str(notes)]
        p.main(args)
        self.assertFalse((self.root / "changelogs").exists())
        p.main([*args, "--apply"])
        self.assertEqual(len(p.releases(self.root)), 1)
        with self.assertRaisesRegex(ValueError, "already recorded"):
            p.main([*args, "--apply"])
        (self.root / "MODLIST.md").write_text("stale")
        with self.assertRaisesRegex(ValueError, "Stale projections"):
            p.render(self.root, snapshot, check=True)
        (self.root / "changelogs/snapshots/baseline.json").write_text("{}")
        with self.assertRaisesRegex(ValueError, "modified"):
            p.releases(self.root)

    def test_page_evidence_is_frozen_in_snapshot(self):
        self.fixture()
        source = {"curseforge:12": {"url": "https://example.org", "observed": "2026-09-08", "excerpt": "Author text"}}
        p.atomic(self.root / "docs/description-sources.json", p.encoded(source))
        snapshot = p.capture(self.root, [], False)
        self.assertEqual(snapshot["description_sources_sha256"], p.digest(p.encoded(source)))

    def prepared_release(self):
        snapshot = self.fixture()
        p.atomic(self.root / "docs/catalogue.json", p.encoded(snapshot))
        notes = self.root / "notes.md"
        notes.write_text("Baseline; no gameplay changes.")
        p.main(["--pack", str(self.root), "release", "--id", "baseline", "--date", "2026-09-08", "--notes", str(notes), "--apply"])
        pdf = b"PDF content receipt fixture; not a rendered document"
        p.atomic(self.root / "docs/MODLIST.pdf", pdf)
        p.atomic(self.root / "docs/pdf-receipt.json", p.encoded({"catalogue_sha256": p.digest((self.root / "docs/catalogue.json").read_bytes()), "pdf_sha256": p.digest(pdf)}))
        return snapshot

    def test_offline_gate_detects_pdf_drift(self):
        self.prepared_release()
        p.main(["--pack", str(self.root), "check"])
        (self.root / "docs/MODLIST.pdf").write_bytes(b"changed")
        with self.assertRaisesRegex(ValueError, "PDF receipt is stale"):
            p.main(["--pack", str(self.root), "check"])

    def test_updated_pack_requires_capture_and_release(self):
        self.prepared_release()
        artifact = (self.root / "mods/example.jar").read_bytes()
        self.index({"mods/example.jar": artifact, "options.txt": b"gamma:2"})
        with self.assertRaisesRegex(ValueError, "Pack inputs changed"):
            p.main(["--pack", str(self.root), "check"])
        p.main(["--pack", str(self.root), "capture", "--apply"])
        self.assertIn("## Unreleased", (self.root / "changelogs/CHANGELOG.md").read_text())
        with self.assertRaisesRegex(ValueError, "no matching release"):
            p.main(["--pack", str(self.root), "check"])
        notes = self.root / "notes.md"
        notes.write_text("Changed brightness default.")
        p.main(["--pack", str(self.root), "release", "--id", "next", "--date", "2026-09-09", "--notes", str(notes), "--apply"])
        self.assertEqual(len(p.releases(self.root)), 2)
        self.assertIn("Changed: options.txt", (self.root / "changelogs/CHANGELOG.md").read_text())

    def test_append_only_gate_checks_git_baseline(self):
        import subprocess
        self.prepared_release()
        def git(*args):
            return subprocess.check_output(["git", "-C", str(self.root), *args], stderr=subprocess.DEVNULL)
        git("init")
        git("add", "changelogs/releases", "changelogs/snapshots")
        git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.org", "-c", "commit.gpgsign=false", "commit", "-m", "baseline")
        p.main(["--pack", str(self.root), "check", "--base", "HEAD"])
        path = self.root / "changelogs/releases/baseline.json"
        record = json.loads(path.read_bytes())
        record["notes"] = "Rewritten history"
        p.atomic(path, p.encoded(record))
        p.render(self.root, p.load_snapshot(self.root / "docs/catalogue.json"))
        with self.assertRaisesRegex(ValueError, "Recorded history changed"):
            p.main(["--pack", str(self.root), "check", "--base", "HEAD"])


if __name__ == "__main__":
    unittest.main()
