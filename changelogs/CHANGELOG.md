# Miladycraft · Changelog

[Current mod catalogue](../MODLIST.md) · [Printable catalogue](../docs/MODLIST.pdf)

Release records preserve exact pack inputs. Recording a release does not assert that it has been deployed or published. Earlier unrecorded updates have not been reconstructed.

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
