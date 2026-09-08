#!/usr/bin/env python3
"""Packwiz catalogue and release projections. Python 3.11+, standard library only."""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager, nullcontext
from datetime import date
import hashlib
import io
import json
import os
import posixpath
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys
import tempfile
import tomllib
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen
import zipfile

SCHEMA = "minetiger.pack_catalogue.v1"
RUNTIME = {"minecraft", "neoforge", "forge", "java", "fabricloader"}
MAX_MEMBER = 64 * 1024 * 1024


@contextmanager
def writer(root):
    path = root / ".pack-docs.lock"
    try:
        handle = path.open("x", encoding="ascii")
    except FileExistsError as error:
        raise ValueError("Another documentation writer or interrupted run owns .pack-docs.lock; inspect it before recovery") from error
    try:
        with handle:
            handle.write(str(os.getpid()) + "\n")
        yield
    finally:
        path.unlink()


def encoded(value):
    return (json.dumps(value, ensure_ascii=False, indent=2, sort_keys=True) + "\n").encode()


def digest(data, algorithm="sha256"):
    if algorithm not in {"sha1", "sha256", "sha512"}:
        raise ValueError(f"Unsupported hash algorithm: {algorithm}")
    return hashlib.new(algorithm, data).hexdigest()


def safe(root, relative):
    p = PurePosixPath(relative)
    if not relative or "\\" in relative or ":" in relative or p.is_absolute() or ".." in p.parts:
        raise ValueError(f"Unsafe relative path: {relative}")
    path = root.joinpath(*p.parts)
    if not path.resolve().is_relative_to(root.resolve()):
        raise ValueError(f"Path escapes root: {relative}")
    if any(parent.is_symlink() for parent in [path, *path.parents] if parent != root.parent):
        raise ValueError(f"Symlink refused: {relative}")
    return path


def atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
        temp = Path(handle.name)
        handle.write(data)
    try:
        os.replace(temp, path)
    finally:
        temp.unlink(missing_ok=True)


def verified(path, expected, algorithm):
    data = path.read_bytes()
    if digest(data, algorithm) != expected.lower():
        raise ValueError(f"Hash mismatch: {path.name}")
    return data


def inputs(root):
    """Read only indexed content, verifying the complete Packwiz hash chain."""
    manifest_bytes = (root / "pack.toml").read_bytes()
    manifest = tomllib.loads(manifest_bytes.decode("utf-8"))
    index_ref = manifest["index"]
    index = tomllib.loads(verified(safe(root, index_ref["file"]), index_ref["hash"],
                                  index_ref["hash-format"]).decode("utf-8"))
    files = {}
    artifacts = []
    for item in index["files"]:
        name = item["file"]
        if name in {"MODLIST.md", "AUTHORING.md", "README.md", ".pack-docs.lock"} or name.startswith(("docs/", "changelogs/", "tools/minetiger-pack-docs/", ".cache/")):
            raise ValueError("Contributor documentation was indexed; run packwiz refresh from the pack directory, not via --pack-file from elsewhere")
        if name in files:
            raise ValueError(f"Duplicate index entry: {name}")
        data = verified(safe(root, name), item["hash"], index["hash-format"])
        files[name] = digest(data)
        if item.get("metafile"):
            meta = tomllib.loads(data.decode("utf-8"))
            safe(root, meta["filename"])
            artifacts.append((name, meta))
        elif name.startswith("mods/") and name.endswith(".jar"):
            artifacts.append((name, {"name": Path(name).stem, "filename": Path(name).name,
                                    "side": "both", "download": {"hash-format": "sha256", "hash": digest(data)},
                                    "direct": name}))
    identity = {"pack_sha256": digest(manifest_bytes), "files": files}
    return manifest, identity, sorted(artifacts)


def url(value):
    value = str(value or "").strip()
    parsed = urlsplit(value)
    return value if parsed.scheme in {"http", "https"} and parsed.netloc and not parsed.username else ""


def provider(meta):
    update = meta.get("update", {})
    if "curseforge" in update:
        p = update["curseforge"]
        base = f"https://www.curseforge.com/projects/{p['project-id']}"
        return f"curseforge:{p['project-id']}", base, f"{base}/files/{p['file-id']}", str(p["file-id"])
    if "modrinth" in update:
        p = update["modrinth"]
        base = f"https://modrinth.com/project/{p['mod-id']}"
        return f"modrinth:{p['mod-id']}", base, f"{base}/version/{p['version']}", str(p["version"])
    location = url(meta.get("download", {}).get("url"))
    return "", location, location, ""


def download_urls(meta):
    direct = url(meta.get("download", {}).get("url"))
    if direct:
        return [direct]
    cf = meta.get("update", {}).get("curseforge")
    if cf:
        number = int(cf["file-id"])
        return [f"https://{host}/files/{number // 1000}/{number % 1000}/{quote(meta['filename'])}"
                for host in ("edge.forgecdn.net", "mediafilez.forgecdn.net")]
    return []


def acquire(meta, candidates, cache, download, transport="urllib"):
    spec = meta["download"]
    algorithm, expected = spec["hash-format"], spec["hash"]
    # Validate before using the digest as a path segment.
    if algorithm not in {"sha1", "sha256", "sha512"} or not re.fullmatch(r"[a-fA-F0-9]+", expected):
        raise ValueError("Unsupported artifact hash")
    cached = cache / f"{algorithm}-{expected}.jar"
    for path in [cached, *candidates.get(meta["filename"], [])]:
        if path.is_file():
            data = path.read_bytes()
            if digest(data, algorithm) == expected.lower():
                return data
    if download:
        failures = []
        for location in download_urls(meta):
            try:
                if transport == "curl":
                    result = subprocess.run(["curl", "--fail", "--silent", "--show-error", "--location", "--proto", "=https",
                                             "--proto-redir", "=https", "--max-time", "90", "--max-filesize", "536870912", location],
                                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=100)
                    if result.returncode:
                        raise OSError(f"curl exited {result.returncode}")
                    data = result.stdout
                else:
                    with urlopen(Request(location, headers={"User-Agent": "minetiger-pack-docs/1"}), timeout=45) as response:
                        data = response.read(512 * 1024 * 1024 + 1)
                if len(data) > 512 * 1024 * 1024 or digest(data, algorithm) != expected.lower():
                    raise ValueError("Downloaded artifact failed size/hash verification")
                atomic(cached, data)
                return data
            except (OSError, ValueError) as error:
                failures.append(type(error).__name__)
        raise ValueError(f"No verified artifact for {meta['filename']}: {', '.join(failures) or 'no download URL'}")
    raise ValueError(f"Missing verified artifact: {meta['filename']}; supply --artifacts or --download")


def member(archive, name):
    if archive.getinfo(name).file_size > MAX_MEMBER:
        raise ValueError(f"Oversize archive member: {name}")
    return archive.read(name)


def archive_metadata(data, family="neoforge", prefix="", depth=0):
    """Read declared descriptors/Jar-in-Jar only; never execute or extract a JAR."""
    if depth > 8:
        raise ValueError("Nested archive depth exceeded")
    modules, evidence = [], []
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        names = set(archive.namelist())
        descriptor = next((p for p in (["fabric.mod.json"] if family == "fabric" else
                           ["META-INF/neoforge.mods.toml", "META-INF/mods.toml"])
                           if p in names), None)
        manifest = {}
        if "META-INF/MANIFEST.MF" in names:
            raw = member(archive, "META-INF/MANIFEST.MF")
            # Java manifests fold long values with a leading space.
            text = raw.decode("utf-8", errors="replace").replace("\r\n", "\n").replace("\n ", "")
            manifest = dict(line.split(": ", 1) for line in text.split("\n\n", 1)[0].splitlines() if ": " in line)
            evidence.append({"path": prefix + "META-INF/MANIFEST.MF", "sha256": digest(raw), "body": raw.decode("utf-8", errors="replace")})
        nested = []
        if descriptor:
            raw = member(archive, descriptor)
            body = raw.decode("utf-8-sig")
            evidence.append({"path": prefix + descriptor, "sha256": digest(raw), "body": body})
            doc = json.loads(body) if descriptor.endswith("json") else tomllib.loads(body)
            if descriptor.endswith("toml"):
                properties = {"jarVersion": manifest.get("Implementation-Version", ""), **doc.get("properties", {})}
                for mod in doc.get("mods", []):
                    version = str(mod.get("version", "1"))
                    version = re.sub(r"\$\{file\.([^}]+)\}", lambda m: str(properties.get(m[1], m[0])), version)
                    declared = doc.get("dependencies") or {}
                    unscoped = isinstance(declared, list)
                    deps = [{"id": d["modId"], "kind": "unscoped" if unscoped else d.get("type", "required" if d.get("mandatory", True) else "optional").lower(),
                             "range": d.get("versionRange", "*"), "side": d.get("side", "BOTH").lower(),
                             "ordering": d.get("ordering", "NONE").lower()}
                            for d in (declared if unscoped else declared.get(mod["modId"], []))]
                    modules.append({"id": mod["modId"], "name": mod.get("displayName", mod["modId"]),
                                    "version": version or "unknown", "description": mod.get("description", ""),
                                    "homepage": url(mod.get("displayURL") or mod.get("modUrl") or doc.get("displayURL")),
                                    "issues": url(doc.get("issueTrackerURL")), "dependencies": deps,
                                    "descriptor": prefix + descriptor, "embedded": bool(prefix)})
            else:
                deps = [{"id": name, "kind": kind, "range": json.dumps(value) if isinstance(value, list) else str(value),
                         "side": doc.get("environment", "*"), "ordering": "none"}
                        for field, kind in [("depends", "required"), ("recommends", "optional"),
                                            ("suggests", "optional"), ("breaks", "incompatible"), ("conflicts", "discouraged")]
                        for name, value in doc.get(field, {}).items()]
                modules.append({"id": doc["id"], "name": doc.get("name", doc["id"]), "version": doc["version"],
                                "description": doc.get("description", ""), "homepage": url(doc.get("contact", {}).get("homepage")),
                                "issues": url(doc.get("contact", {}).get("issues")), "dependencies": deps,
                                "descriptor": prefix + descriptor, "embedded": bool(prefix)})
                nested = [entry["file"] for entry in doc.get("jars", [])]
        if "META-INF/jarjar/metadata.json" in names and family != "fabric":
            raw = member(archive, "META-INF/jarjar/metadata.json")
            evidence.append({"path": prefix + "META-INF/jarjar/metadata.json", "sha256": digest(raw), "body": raw.decode("utf-8")})
            nested = [entry["path"] for entry in json.loads(raw).get("jars", [])]
        for path in sorted(set(nested)):
            child_modules, child_evidence = archive_metadata(member(archive, path), family, prefix + path + "!/", depth + 1)
            modules.extend(child_modules)
            evidence.extend(child_evidence)
    return modules, evidence


def capture(root, artifact_roots, download, transport="urllib"):
    manifest, identity, entries = inputs(root)
    candidates = {}
    for folder in artifact_roots:
        for path in sorted(folder.rglob("*.jar")):
            candidates.setdefault(path.name, []).append(path)
    family = "fabric" if "fabric" in manifest["versions"] else "neoforge"
    cache = root / ".cache/pack-docs"
    sources_path = root / "docs/description-sources.json"
    source_bytes = sources_path.read_bytes() if sources_path.exists() else b"{}"
    sources = json.loads(source_bytes)

    def inspect(entry):
        path, meta = entry
        key, page, release, provider_version = provider(meta)
        is_mod = path.startswith("mods/") and meta["filename"].endswith(".jar")
        record = {"key": key or "path:" + path, "path": path, "name": meta["name"],
                  "filename": meta["filename"], "side": meta.get("side", "both"),
                  "optional": meta.get("option", {}), "pinned": meta.get("pin", False),
                  "kind": "mod" if is_mod else "asset", "page": page, "release": release,
                  "provider_version": provider_version, "download": meta["download"],
                  "modules": [], "evidence": []}
        if key in sources:
            source = sources[key]
            if not url(source["url"]) or not source["excerpt"].strip():
                raise ValueError(f"Invalid description source: {key}")
            date.fromisoformat(source["observed"])
            record["description_source"] = {**source, "excerpt_sha256": digest(source["excerpt"].encode())}
        if is_mod:
            data = safe(root, meta["direct"]).read_bytes() if "direct" in meta else acquire(meta, candidates, cache, download, transport)
            record["sha256"] = digest(data)
            try:
                record["modules"], record["evidence"] = archive_metadata(data, family)
            except (ValueError, KeyError, AttributeError, zipfile.BadZipFile) as error:
                raise ValueError(f"Metadata error in {meta['filename']}: {error}") from error
            if not key:
                ids = sorted(m["id"] for m in record["modules"] if not m["embedded"])
                if ids:
                    record["key"] = "local-mod:" + ",".join(ids)
            if meta.get("direct"):
                record["release"] = meta["direct"]
                record["page"] = next((m["homepage"] for m in record["modules"] if m["homepage"]), meta["direct"])
        return record

    with ThreadPoolExecutor(max_workers=6) as pool:
        records = list(pool.map(inspect, entries))
    keys = [r["key"] for r in records]
    if len(keys) != len(set(keys)):
        raise ValueError("Duplicate provider identity in pack; resolve before documenting")
    # Re-read to reject a pack update racing metadata collection.
    if inputs(root)[1] != identity:
        raise ValueError("Pack changed during capture")
    return {"schema": SCHEMA, "pack": {k: manifest[k] for k in ("name", "version", "versions")},
            "inputs": identity, "description_sources_sha256": digest(source_bytes), "artifacts": records}


def load_snapshot(path):
    result = json.loads(path.read_bytes())
    if result.get("schema") != SCHEMA:
        raise ValueError(f"Unsupported catalogue schema: {path}")
    return result


def inline(value):
    # Presentation policy: preserve original author strings in JSON evidence.
    value = re.sub(r"[\U0001f000-\U0001faff\u2600-\u27bf\ufe0f\u200d]", "", str(value))
    value = re.sub(r"§[0-9a-fk-or]", "", value, flags=re.IGNORECASE)
    return " ".join(value.split())


def md(value):
    return re.sub(r"([\\`*_{}\[\]<>|#])", r"\\\1", inline(value))


def link(label, target):
    return f"[{md(label)}]({quote(target, safe=':/#?=&%+~@.-_')})" if target else md(label)


def anchor(record):
    return "mod-" + hashlib.sha256(record["key"].encode()).hexdigest()[:16]


def display_name(record):
    if record["key"].startswith("local-mod:"):
        return next((m["name"] for m in record["modules"] if not m["embedded"]), record["name"])
    return record["name"]


def sortname(record):
    return re.sub(r"^[^\w]+", "", inline(display_name(record))).casefold(), record["key"]


def side(value):
    return {"both": "client and server", "*": "client and server", "client": "client only", "server": "server only"}.get(value.lower(), value)


def versions(record):
    values = list(dict.fromkeys(m["version"] for m in record["modules"] if not m["embedded"]))
    if not values or any(v == "unknown" or "${" in v for v in values):
        return "file " + (record["provider_version"] or record["filename"]) + " (version not declared)"
    return "; ".join(values)


def description(record):
    if "description_source" in record:
        return record["description_source"]["excerpt"]
    return " ".join(dict.fromkeys(inline(m["description"]) for m in record["modules"]
                                  if not m["embedded"] and m["description"].strip())) or "Description not declared in the shipped descriptor."


def graph(snapshot):
    owners = {}
    for record in snapshot["artifacts"]:
        for module in record["modules"]:
            owners.setdefault(module["id"], []).append((record, module))
    return owners


def dependencies(record):
    return [(m, d) for m in record["modules"] for d in m["dependencies"]]


def reverse(record, snapshot, kind):
    ids = {m["id"] for m in record["modules"] if not m["embedded"]}
    return [other for other in snapshot["artifacts"] if other["key"] != record["key"] and
            any(d["id"] in ids and d["kind"] == kind for _, d in dependencies(other))]




def catalogue_md(snapshot):
    snapshot = {**snapshot, "artifacts": [{**r, "name": display_name(r)} for r in snapshot["artifacts"]]}
    pack = snapshot["pack"]
    records = sorted(snapshot["artifacts"], key=sortname)
    mods = [r for r in records if r["kind"] == "mod"]
    owners = graph(snapshot)
    lines = [f"# {md(pack['name'])} · Mod catalogue", "",
             f"Pack **{md(pack['version'])}** · " + " · ".join(f"{md(k)} **{md(v)}**" for k, v in pack["versions"].items()), "",
             f"{len(mods)} mods. Choose a name below to see its description and dependencies. [Changelog](changelogs/CHANGELOG.md) · [PDF](docs/MODLIST.pdf) · [Source metadata](docs/catalogue.json)", "",
             "## Index", "", "| Mod and source | Installed version | Side | Description |", "| :--- | :--- | :--- | :--- |"]
    for record in mods:
        text = description(record)
        summary = text if len(text) <= 170 else text[:167].rsplit(" ", 1)[0] + "…"
        lines.append(f"| {link(record['name'], '#' + anchor(record))} · {link('page', record['page'])} | {link(versions(record), record['release'])} | {md(side(record['side']))} | {md(summary)} |")
    lines += ["", "## Reading the catalogue", "",
             "**Requires** lists mods an entry needs; **Used by** lists mods that need it. **Optional integrations** and **Optional dependency of** show the same two directions for optional relationships. Empty groups are omitted.", "",
             "Generated from the Packwiz index and hash-verified shipped JAR descriptors. This is the configured pack, not a running-client census. Optional selections and client/server sides are preserved. Descriptions are author text, not independent reviews.", "",
             "Dependencies below are declared constraints, not a solved or runtime-tested compatibility graph. “Not indexed” means no matching declared mod ID was found; it is not proof of a broken pack. “Unscoped” marks a nonstandard dependency table, not a loader-enforced requirement. Bundled copies are candidates, not the loader's selected versions. Reverse lists concern top-level mod IDs; bundled-module edges remain in the detailed tables. Runtime requirements are kept separate. Emoji are omitted from these projections; original strings remain in JSON.", "",
             "## Mod details", ""]
    for record in mods:
        lines += [f'<a id="{anchor(record)}"></a>', f"### {md(record['name'])}", "",
                  f"**{link(versions(record), record['release'])}** · {md(side(record['side']))} · {link('Source', record['page'])} · {link('Pack entry', record['path'])}", "", md(description(record)), ""]
        if "description_source" in record:
            source = record["description_source"]
            lines += [f"Description: {link('author page excerpt', source['url'])}, observed {source['observed']} (project summary, not a version-specific claim).", ""]
        sites = sorted(set(m["homepage"] for m in record["modules"] if m["homepage"]))
        if sites:
            lines += ["Author links: " + " · ".join(link(s, s) for s in sites), ""]
        if record["optional"]:
            lines += ["Packwiz option: " + md(json.dumps(record["optional"], sort_keys=True)), ""]
        lines += ["Mod IDs and versions: " + (", ".join(md(m["id"] + " " + m["version"]) for m in record["modules"] if not m["embedded"]) or "not declared") + ".", ""]
        deps = dependencies(record)
        for kind, heading in [("required", "Requires"), ("optional", "Optional integrations")]:
            labels = []
            for module, dep in deps:
                if module["embedded"] or dep["id"] in RUNTIME or dep["kind"] != kind:
                    continue
                found = owners.get(dep["id"], [])
                labels += [link(r["name"] + (" (bundled)" if m["embedded"] else ""), "#" + anchor(r)) for r, m in found] or [md(dep["id"]) + " (not in this catalogue)"]
            if labels:
                lines += [f"**{heading}:** " + ", ".join(dict.fromkeys(labels)) + ".", ""]
        for kind, heading in [("required", "Used by"), ("optional", "Optional dependency of")]:
            incoming = reverse(record, snapshot, kind)
            if incoming:
                lines += [f"**{heading}:** " + ", ".join(link(r["name"], "#" + anchor(r)) for r in incoming) + ".", ""]
        for runtime, heading in [(False, "Dependencies and integrations"), (True, "Runtime constraints")]:
            selected = [(m, d) for m, d in deps if (d["id"] in RUNTIME) == runtime]
            if not selected:
                continue
            lines += [f"**{heading}**", "", "| From | Dependency | Kind | Version range | Side | Found in pack |", "| :--- | :--- | :--- | :--- | :--- | :--- |"]
            for module, dep in selected:
                candidates = owners.get(dep["id"], [])
                found = "runtime" if runtime else "; ".join(dict.fromkeys(link(r["name"] + (" (bundled)" if m["embedded"] else ""), "#" + anchor(r)) for r, m in candidates)) or "not indexed"
                lines.append(f"| {md(module['id'])}{' (bundled)' if module['embedded'] else ''} | {md(dep['id'])} | {md(dep['kind'])} | {md(dep['range'])} | {md(side(dep['side']))} | {found} |")
            lines.append("")
        embedded = [m for m in record["modules"] if m["embedded"]]
        if embedded:
            lines += ["**Bundled modules:** " + "; ".join(md(m["id"] + " " + m["version"]) for m in embedded) + ".", ""]
        descriptors = sorted(set(m["descriptor"] for m in record["modules"] if not m["embedded"]))
        lines += ["Source: " + md(record["filename"]) + " · " + md(", ".join(descriptors) or "no supported descriptor") + ". "
                  + "Exact descriptor bodies and SHA-256 identities are retained in the structured snapshot.", ""]
    assets = [r for r in records if r["kind"] != "mod"]
    if assets:
        lines += ["## Other indexed assets", "", "| Asset | Pinned release | Pack metadata |", "| :--- | :--- | :--- |"]
        for record in assets:
            lines += [f"| {link(record['name'], record['page'])} | {link(versions(record), record['release'])} | {link(record['path'], record['path'])} |"]
    return "\n".join(lines) + "\n"


def markdown_bundle(snapshot, index_path="MODLIST.md", detail_dir="docs/mods", snapshot_path="docs/catalogue.json"):
    """Keep the entry point small; chapter links remain relative and portable."""
    full = catalogue_md(snapshot)
    index, details = full.split("## Mod details\n", 1)
    if "## Other indexed assets" in details:
        details, assets = details.split("## Other indexed assets", 1)
        index += "## Other indexed assets" + assets
    routes = {anchor(r): detail_dir + "/" + sortname(r)[0][0] + ".md#" + anchor(r)
              for r in snapshot["artifacts"] if r["kind"] == "mod"}
    chapters = {}
    for block in re.split(r'(?=<a id="mod-)', details):
        match = re.match(r'<a id="([^"]+)"', block)
        if match:
            path = routes[match[1]].split("#")[0]
            chapters[path] = chapters.get(path, "") + block

    def rebase(text, output):
        def replace(match):
            target = match[1]
            if target.startswith("#"):
                target = routes[target[1:]]
            elif urlsplit(target).scheme:
                return match[0]
            if target == "docs/catalogue.json":
                target = snapshot_path
            return "](" + posixpath.relpath(target, posixpath.dirname(output) or ".") + ")"
        return re.sub(r"\]\(([^)]+)\)", replace, text)

    outputs = {index_path: rebase(index, index_path)}
    for path, body in chapters.items():
        intro = f"# {md(snapshot['pack']['name'])} · {Path(path).stem.upper()}\n\n"
        intro += f"[Catalogue index]({posixpath.relpath(index_path, posixpath.dirname(path))}) · "
        intro += f"[Captured metadata]({posixpath.relpath(snapshot_path, posixpath.dirname(path))})\n\n"
        outputs[path] = intro + rebase(body, path)
    if index_path != "MODLIST.md":
        outputs[index_path] = outputs[index_path].replace("[PDF]", "[Current PDF]")
        outputs[index_path] += "\nMetadata-file links refer to the current pack paths; this catalogue's values come from its frozen snapshot.\n"
    return outputs










def changes(before, after):
    old = {r["key"]: r for r in before["artifacts"]}
    new = {r["key"]: r for r in after["artifacts"]}
    lines = []
    for title, keys in [("Added", new.keys() - old.keys()), ("Removed", old.keys() - new.keys()),
                        ("Updated", {k for k in new.keys() & old.keys() if any(old[k].get(f) != new[k].get(f)
                                     for f in ("download", "side", "optional", "pinned", "filename", "path"))})]:
        if keys:
            lines += [f"### {title}", ""]
            for key in sorted(keys, key=lambda k: (new.get(k) or old[k])["name"].casefold()):
                record = new.get(key) or old[key]
                value = link(versions(record), record["release"])
                if title == "Updated":
                    value = link(versions(old[key]), old[key]["release"]) + " → " + value
                    if old[key]["download"] != new[key]["download"] and versions(old[key]) == versions(new[key]):
                        value += " (artifact changed; version label unchanged)"
                    for field in ("side", "optional", "pinned", "filename", "path"):
                        if old[key].get(field) != new[key].get(field):
                            value += f"; {field}: {md(old[key].get(field))} → {md(new[key].get(field))}"
                lines += [f"- {link(record['name'], record['page'])}: {value}."]
            lines.append("")
    if before["pack"] != after["pack"]:
        lines += ["### Pack and loader", "", "- " + md(json.dumps(before["pack"], sort_keys=True)) + " → " + md(json.dumps(after["pack"], sort_keys=True)), ""]
    paths = {r["path"] for r in [*old.values(), *new.values()]}
    oldfiles, newfiles = before["inputs"]["files"], after["inputs"]["files"]
    changed = [p for p in sorted(oldfiles.keys() | newfiles.keys()) if p not in paths and oldfiles.get(p) != newfiles.get(p)]
    if changed:
        lines += ["### Configuration and other pack files", ""]
        lines += [f"- {'Added' if p not in oldfiles else 'Removed' if p not in newfiles else 'Changed'}: {md(p)}." for p in changed]
        lines.append("")
    return "\n".join(lines) if lines else "No indexed pack changes.\n"


def releases(root):
    results = []
    for path in sorted((root / "changelogs/releases").glob("*.json")):
        record = json.loads(path.read_bytes())
        if record.get("schema") != "minetiger.pack_release.v1":
            raise ValueError(f"Unsupported release schema: {path}")
        snap_path = safe(root, record["snapshot"])
        if digest(snap_path.read_bytes()) != record["snapshot_sha256"]:
            raise ValueError(f"Release snapshot was modified: {path.name}")
        results.append((record, load_snapshot(snap_path)))
    ordered = sorted(results, key=lambda pair: pair[0]["sequence"])
    for index, (record, _) in enumerate(ordered):
        if record["sequence"] != index + 1 or record["previous"] != (ordered[index - 1][0]["id"] if index else None):
            raise ValueError("Release chain is not contiguous")
    return ordered


def projections(root, snapshot):
    outputs = markdown_bundle(snapshot)
    history = releases(root)
    lines = [f"# {md(snapshot['pack']['name'])} · Changelog", "", "[Current mod catalogue](../MODLIST.md) · [Printable catalogue](../docs/MODLIST.pdf)", "",
             "Release records preserve exact pack inputs. Recording a release does not assert that it has been deployed or published. Earlier unrecorded updates have not been reconstructed.", ""]
    if history and history[-1][1]["inputs"] != snapshot["inputs"]:
        lines += ["## Unreleased", "", changes(history[-1][1], snapshot), ""]
    for index in reversed(range(len(history))):
        record, snap = history[index]
        lines += [f"## {md(record['id'])} · {record['date']}", "", f"Pack {md(snap['pack']['version'])} · "
                  + link("Recorded mod catalogue", f"modlist/{record['id']}.md") + " · "
                  + link("Snapshot", "../" + record["snapshot"]), "", record["notes"].strip(), ""]
        lines += [changes(history[index - 1][1], snap) if index else "Initial documentation baseline. This records existing contents; it is not an assertion that every mod was added in this release.", ""]
        outputs.update(markdown_bundle(snap, f"changelogs/modlist/{record['id']}.md", f"changelogs/modlist/{record['id']}", record["snapshot"]))
    outputs["changelogs/CHANGELOG.md"] = "\n".join(lines)
    return {path: (content.rstrip() + "\n").encode("utf-8") for path, content in outputs.items()}


def render(root, snapshot, check=False):
    stale = []
    expected = projections(root, snapshot)
    for relative, data in expected.items():
        path = safe(root, relative)
        if not path.exists() or path.read_bytes() != data:
            if check:
                stale.append(relative)
            else:
                atomic(path, data)
    if stale:
        raise ValueError("Stale projections: " + ", ".join(stale))
    # A removed last mod under a letter must not leave a misleading old chapter.
    for path in (root / "docs/mods").glob("*.md"):
        if path.relative_to(root).as_posix() not in expected:
            if check:
                raise ValueError(f"Obsolete generated chapter: {path.name}")
            path.unlink()




def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pack", type=Path, default=Path(__file__).resolve().parents[2])
    sub = parser.add_subparsers(dest="command", required=True)
    cap = sub.add_parser("capture", help="Verify pack/JARs and capture catalogue; network only with --download")
    cap.add_argument("--artifacts", type=Path, action="append", default=[])
    cap.add_argument("--download", action="store_true")
    cap.add_argument("--transport", choices=["urllib", "curl"], default="urllib", help="Choose curl to use the OS curl certificate store")
    cap.add_argument("--apply", action="store_true")
    ren = sub.add_parser("render", help="Render Markdown from frozen metadata, offline")
    ren.add_argument("--apply", action="store_true")
    check = sub.add_parser("check", help="Fail if pack, release, Markdown or PDF evidence is stale")
    check.add_argument("--base", help="Also verify recorded history has not changed since this Git revision")
    rel = sub.add_parser("release", help="Append an immutable release record; never deploys")
    rel.add_argument("--id", required=True)
    rel.add_argument("--date", required=True)
    rel.add_argument("--notes", type=Path, required=True)
    rel.add_argument("--apply", action="store_true")
    args = parser.parse_args(argv)
    root = args.pack.resolve()
    with writer(root) if getattr(args, "apply", False) else nullcontext():
        run_command(args, root)


def run_command(args, root):
    if args.command == "capture":
        if args.download and not args.apply:
            raise ValueError("--download requires --apply because it writes the artifact cache")
        snapshot = capture(root, args.artifacts, args.download, args.transport)
        if args.apply:
            atomic(root / "docs/catalogue.json", encoded(snapshot))
            render(root, snapshot)
        print(json.dumps({"artifacts": len(snapshot["artifacts"]), "mod_archives": sum(r["kind"] == "mod" for r in snapshot["artifacts"]),
                          "without_descriptors": [r["name"] for r in snapshot["artifacts"] if r["kind"] == "mod" and not r["modules"]], "applied": args.apply}))
        return
    snapshot = load_snapshot(root / "docs/catalogue.json")
    if inputs(root)[1] != snapshot["inputs"]:
        raise ValueError("Pack inputs changed; run capture before rendering or recording a release")
    sources = root / "docs/description-sources.json"
    if snapshot.get("description_sources_sha256") != digest(sources.read_bytes() if sources.exists() else b"{}"):
        raise ValueError("Description sources changed; run capture")
    if args.command == "release":
        if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]{0,79}", args.id):
            raise ValueError("Release ID must be a safe filename")
        date.fromisoformat(args.date)
        history = releases(root)
        if any(r["id"] == args.id for r, _ in history):
            raise ValueError("Release ID already recorded; history is immutable")
        if history and args.date < history[-1][0]["date"]:
            raise ValueError("Release date precedes the latest record")
        if history and snapshot["inputs"] == history[-1][1]["inputs"]:
            raise ValueError("No pack changes since the last release")
        notes = args.notes.read_text(encoding="utf-8").strip()
        if not notes:
            raise ValueError("Release notes must describe player consequences or explicitly say none")
        path = f"changelogs/snapshots/{args.id}.json"
        record = {"schema": "minetiger.pack_release.v1", "id": args.id, "date": args.date,
                  "sequence": len(history) + 1, "previous": history[-1][0]["id"] if history else None,
                  "notes": notes, "snapshot": path, "snapshot_sha256": digest(encoded(snapshot))}
        if args.apply:
            record_path = safe(root, f"changelogs/releases/{args.id}.json")
            if record_path.exists() or safe(root, path).exists():
                raise ValueError("Release destination exists")
            atomic(safe(root, path), encoded(snapshot))
            atomic(record_path, encoded(record))
            render(root, snapshot)
        print(json.dumps({"release": args.id, "applied": args.apply}))
    elif args.command == "render":
        render(root, snapshot, check=not args.apply)
        print("Projections verified" if not args.apply else "Projections written")
    elif args.command == "check":
        render(root, snapshot, check=True)
        history = releases(root)
        if not history or history[-1][1]["inputs"] != snapshot["inputs"]:
            raise ValueError("Current pack has no matching release record")
        receipt = json.loads((root / "docs/pdf-receipt.json").read_bytes())
        if receipt["catalogue_sha256"] != digest((root / "docs/catalogue.json").read_bytes()) or receipt["pdf_sha256"] != digest((root / "docs/MODLIST.pdf").read_bytes()):
            raise ValueError("PDF receipt is stale; rebuild with the external PDF tool")
        if args.base:
            revision = subprocess.check_output(["git", "-C", str(root), "rev-parse", "--verify", args.base + "^{commit}"]).decode().strip()
            paths = subprocess.check_output(["git", "-C", str(root), "ls-tree", "-r", "--name-only", revision, "--", "changelogs/releases", "changelogs/snapshots"]).decode().splitlines()
            for path in paths:
                old = subprocess.check_output(["git", "-C", str(root), "show", revision + ":" + path])
                if not safe(root, path).exists() or safe(root, path).read_bytes() != old:
                    raise ValueError(f"Recorded history changed since {revision}: {path}")
        print("Pack inputs, release chain, Markdown and PDF receipt verified (offline)")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, zipfile.BadZipFile, subprocess.SubprocessError) as error:
        print(f"pack-docs: {error}", file=sys.stderr)
        sys.exit(1)
