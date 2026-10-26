# Pack authoring and release documentation

Use Python 3.11 or newer. The pack documentation tool uses the Python standard
library. The optional PDF builder lives outside this pack, in the lab under
`operations/miladycraft/tools/smoothstone-pack-pdf/`. It reads the captured JSON
and requires LuaLaTeX. The pack contains the shareable PDF and its receipt,
not a TeX toolchain or renderer.

## Update flow

1. Review and apply the pack update through the pack's normal authoring flow.
   Run `packwiz refresh` **from this pack directory** so all indexed content
   and manifest hashes agree. Do not run it from a parent directory with
   `--pack-file`: Packwiz's ignore context then differs and can index local files.
2. Capture the configured pack. Reuse downloaded JARs from a client or server
   installation where available; their bytes must match the pinned hashes.
3. Read the generated `Unreleased` comparison in `changelogs/CHANGELOG.md`.
   Write a short notes file explaining player-visible changes, compatibility
   consequences and required actions. The tool supplies mod additions,
   removals, updates, side/option changes, loader changes and configuration
   filenames; it cannot infer what a script change means for players.
4. Record a new release, build the PDF, and run the offline check. Choose a
   unique release ID even when `pack.toml` retains the same alpha version.
5. Commit the complete candidate and push it. The servers install their branch
   with packwiz when they restart, as players do when they launch: DEV's
   `miladycraft-dev` first, then `master` for the SMP. Documentation does not
   replace gameplay verification or prove that a release is deployed.

From this repository root:

```sh
python tools/smoothstone-pack-docs/pack_docs.py capture --artifacts /path/to/instance/mods --download --apply
python tools/smoothstone-pack-docs/pack_docs.py release --id 1.6.1-alpha --date 2026-09-09 --notes /path/to/release-notes.md --apply
python /path/to/lab/operations/miladycraft/tools/smoothstone-pack-pdf/build_pdf.py --pack . --apply
python tools/smoothstone-pack-docs/pack_docs.py check
```

The date and release ID above are examples; use the actual release details.
`--artifacts` may be repeated. `--download` fetches only missing pinned JARs
and verifies their hashes before use; downloads go into ignored `.cache/`.
If the host's Python certificate store is unavailable, select its configured
curl transport explicitly with `--transport curl`. Both transports verify TLS;
neither uses insecure certificate options. Direct downloads and CurseForge CDN
artifact URLs are supported. A provider failure stops capture without replacing
the previous catalogue. Provide an already materialized JAR when acquisition
is unavailable. No provider API credentials are needed for offline use.

All writing commands require `--apply`. Without it, capture inspects available
local bytes, release validates a proposed record, and render checks projections.
The external PDF builder likewise validates inputs without compiling. `--download` also
requires `--apply`, because it writes the cache.

Writers serialize through `.pack-docs.lock`, which records the process ID.
After an interrupted process, first verify that it has exited, then remove its
stale lock and rerun. Individual files are atomically replaced. A failed render
can be regenerated from the captured JSON. A release snapshot written before
an interrupted record commit is an orphan: retain its bytes for inspection,
move it outside `changelogs/snapshots/`, and rerun the release command. Never
replace a snapshot referenced by an existing release record.

```sh
python tools/smoothstone-pack-docs/pack_docs.py render --apply
python -m unittest discover -s tools/smoothstone-pack-docs -v
python tools/smoothstone-pack-docs/pack_docs.py check --base HEAD
```

`check` is offline. It verifies every indexed file, the captured pack identity,
the release chain and frozen snapshot hashes, deterministic Markdown,
and the PDF's catalogue/content receipt. `--base` additionally rejects edits or
deletions to release records and snapshots already present at a Git revision.
The GitHub workflow runs both checks against the push or pull-request base.
It does not compile TeX in CI; external PDF builds reject missing glyphs, overflow
and nonconverging references. Visually inspect a changed PDF before publication.

## Pack variants

`variants/<name>/` holds a variant's differences from this pack: a
`variant.toml` (name, version label, base files to `remove`, base files to
`override`) and the overlay files themselves. Packwiz ignores `variants/`, so
the overlay never changes this pack's index. Each overlay carries a
`pack.toml` on this pack's exact `[versions]`, so Packwiz commands work inside
it:

```sh
cd variants/miladycraft-dev && ../../packwiz modrinth add <mod>
```

Commit, then regenerate the variant's branch checkout from the lab root. The
variant carries only installable pack files, never this repository's
documentation, tooling or CI:

```powershell
git -C operations/miladycraft/pack worktree add ../pack-dev miladycraft-dev   # once
.\target\release\smoothstone.exe pack derive --pack operations/miladycraft/pack `
  --variant miladycraft-dev --output operations/miladycraft/pack-dev `
  --packwiz operations/miladycraft/pack/packwiz.exe --apply
```

Re-derive after every change to this pack, so the variant follows it, and push
its branch before the SMP's: DEV starts a change first. Promoting a trial mod moves its file from the overlay to `mods/`.
The `miladycraft-dev` variant is the pack of the DEV server (the SMP runs this
pack) and installs from
`https://raw.githubusercontent.com/virtualonno/miladycraft/miladycraft-dev/pack.toml`.

## What owns each document

- `pack.toml`, `index.toml` and indexed files own installed-content intent.
- `docs/catalogue.json` captures verified JAR hashes, original descriptor bodies,
  module IDs, versions, dependency ranges/sides, bundled modules and source links.
  It is generated evidence, not another editable mod list.
- `docs/description-sources.json` supplies small, reviewed author-page excerpts
  when an archive omits a useful description. Key each entry by provider project
  identity, with `url`, `observed` (ISO date) and exact `excerpt`. The capture
  freezes the excerpt and its digest. These are project summaries, not claims
  about a particular installed release. Never infer dependencies from prose.
- `changelogs/releases/` contains append-only release notes and ordering;
  `changelogs/snapshots/` preserves each release's full catalogue. The initial
  baseline is explicitly not a reconstruction of earlier release history.
- `MODLIST.md`, its alphabetical detail chapters under `docs/mods/`,
  `changelogs/CHANGELOG.md` and historical Markdown catalogues are deterministic
  projections. Edit their inputs.
- `docs/MODLIST.pdf` is the current human edition. Its receipt binds it to the
  captured catalogue and records the external renderer, template, engine and
  TeX source identities. Historical catalogues link to it as the current PDF.

Documentation and its tools are published in Git but excluded from Packwiz
installation. Do not remove those exclusions or index the generated documents;
that would make catalogue generation depend on its own output hashes.

## Interpretation and typography

NeoForge and Forge descriptors are selected before any Fabric descriptor in
the production pack; Fabric's descriptor is supported for a Fabric pack.
Declared nested JARs are inspected without extraction or execution. Required,
optional, incompatible and discouraged dependencies stay distinct. A
nonstandard unscoped table remains visibly unscoped. Reverse lists include
incoming declarations for top-level mod IDs; embedded edges stay in the
detailed tables. A bundled copy is not proof of loader version selection.
Language-provider requirements are not currently inferred as mod dependencies.

Names, descriptions and version labels come from author metadata. Missing
versions remain explicit and link to the pinned provider file; filenames are
never parsed to guess versions. Missing descriptors and unresolved IDs remain
visible. Packwiz side and optional-selection settings describe configured
installation intent, independently of a dependency's declared side.

The PDF uses A4, Latin Modern Roman, restrained headings, black text and quiet
hyperlinks. Markdown uses an alphabetical index and stable per-project anchors.
Emoji and Minecraft formatting codes are omitted from presentation while
original author text remains in the captured evidence. TeX escaping and
`-no-shell-escape` keep metadata from becoming executable typesetting commands.

Format references: [Craftoria's changelog](https://github.com/TeamAOF/Craftoria/blob/main/changelogs/CHANGELOG.md)
and [NeoForge's 1.21.1 descriptor contract](https://docs.neoforged.net/docs/1.21.1/gettingstarted/modfiles/).
