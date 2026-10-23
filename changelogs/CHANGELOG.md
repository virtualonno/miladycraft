# Miladycraft · Changelog

[Current mod catalogue](../MODLIST.md) · [Printable catalogue](../docs/MODLIST.pdf)

Release records preserve exact pack inputs. Recording a release does not assert that it has been deployed or published. Earlier unrecorded updates have not been reconstructed.

## 1.6.0-alpha-2026-10-23-2 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23-2.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23-2.json)

Fixes a server freeze and two broken drops and recipes.

- Sophisticated Backpacks 3.26.14 and Sophisticated Core 1.5.17: an Inception
  upgrade re-registered its inventory listener every time it initialized, so a
  busy backpack could collect enough listeners for one slot change to stall the
  server past the watchdog (the SMP restarted from this on 2026-10-06). 3.26
  also adds linked backpack storage through the Ender Linker.
- Beautify trellises, lamp jars and hanging pots drop themselves again when
  broken. Their loot tables used a pre-1.21 field and never loaded; the pack
  now ships corrected tables.
- Beetroot soup is craftable again. Cultural Delights shipped an empty recipe
  file that replaced vanilla's; the pack restores the vanilla recipe.

Clients update automatically; no player action is needed.

### Updated

- [Sophisticated Backpacks](https://www.curseforge.com/projects/422301): [3.25.73](https://www.curseforge.com/projects/422301/files/8503096) → [3.26.14](https://www.curseforge.com/projects/422301/files/9271144); filename: sophisticatedbackpacks-1.21.1-3.25.73.2020.jar → sophisticatedbackpacks-1.21.1-3.26.14.2222.jar.
- [Sophisticated Core](https://www.curseforge.com/projects/618298): [1.4.80](https://www.curseforge.com/projects/618298/files/8503041) → [1.5.17](https://www.curseforge.com/projects/618298/files/9279274); filename: sophisticatedcore-1.21.1-1.4.80.2194.jar → sophisticatedcore-1.21.1-1.5.17.2426.jar.

### Configuration and other pack files

- Added: kubejs/data/beautify/loot\_table/blocks/acacia\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/birch\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/crimson\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/dark\_oak\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/hanging\_pot.json.
- Added: kubejs/data/beautify/loot\_table/blocks/jungle\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/lamp\_jar.json.
- Added: kubejs/data/beautify/loot\_table/blocks/mangrove\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/oak\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/spruce\_trellis.json.
- Added: kubejs/data/beautify/loot\_table/blocks/warped\_trellis.json.
- Added: kubejs/data/minecraft/recipe/beetroot\_soup.json.


## 1.6.0-alpha-2026-10-23 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23.json)

Removes Concurrent Chunk Management Engine (C2ME). Its rewritten chunk system
runs chunk unloads inside a blocking chunk load, and an unloading Applied
Energistics 2 cable then waits on a chunk that never finishes loading: the
server stops ticking until the watchdog restarts it. The SMP hit this twice on
2026-10-23 (upstream: C2ME-neoforge issue 98, Applied Energistics 2 issue
9030). Chunk loading follows vanilla NeoForge again; worlds are unaffected.
Clients update automatically; no player action is needed.

### Removed

- [Concurrent Chunk Management Engine](https://www.curseforge.com/projects/533097): [0.4.0-alpha.0.116+1.21.1](https://www.curseforge.com/projects/533097/files/8480771).


## 1.6.0-alpha-baseline · 2026-09-08

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-baseline.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-baseline.json)

Documentation baseline for the existing 1.6.0-alpha pack. The mod catalogue
now records pinned artifacts, author descriptions and declared dependencies,
with a printable edition for contributors. No gameplay or loader change is
introduced by this documentation baseline. Earlier updates remain in Git
history and have not been assigned retrospective release dates.

Initial documentation baseline. This records existing contents; it is not an assertion that every mod was added in this release.
