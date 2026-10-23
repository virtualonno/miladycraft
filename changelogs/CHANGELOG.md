# Miladycraft · Changelog

[Current mod catalogue](../MODLIST.md) · [Printable catalogue](../docs/MODLIST.pdf)

Release records preserve exact pack inputs. Recording a release does not assert that it has been deployed or published. Earlier unrecorded updates have not been reconstructed.

## 1.6.0-alpha-2026-10-23-6 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23-6.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23-6.json)

Updates moonedit to 0.1.0-alpha.3 for operators: corners can be set one at a time with /mo from and /mo to (handy in spectator), undo also removes pasted blocks whose state changed since, moved entities keep their latest state, and edits run a little faster. Nothing changes for players.

### Updated

- [moonedit](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.3/moonedit-neoforge-1.21.1-0.1.0-alpha.3.jar): [0.1.0-alpha.2](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.2/moonedit-neoforge-1.21.1-0.1.0-alpha.2.jar) → [0.1.0-alpha.3](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.3/moonedit-neoforge-1.21.1-0.1.0-alpha.3.jar); filename: moonedit-neoforge-1.21.1-0.1.0-alpha.2.jar → moonedit-neoforge-1.21.1-0.1.0-alpha.3.jar.

### Configuration and other pack files

- Changed: config/moonedit-server.toml.


## 1.6.0-alpha-2026-10-23-5 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23-5.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23-5.json)

Updates moonedit to 0.1.0-alpha.2 for operators: builds saved on one server are now readable by the other, so a build saved on the SMP loads on DEV. Nothing changes for players.

### Updated

- [moonedit](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.2/moonedit-neoforge-1.21.1-0.1.0-alpha.2.jar): [0.1.0-alpha.1](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.1/moonedit-neoforge-1.21.1-0.1.0-alpha.1.jar) → [0.1.0-alpha.2](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.2/moonedit-neoforge-1.21.1-0.1.0-alpha.2.jar); filename: moonedit-neoforge-1.21.1-0.1.0-alpha.1.jar → moonedit-neoforge-1.21.1-0.1.0-alpha.2.jar.


## 1.6.0-alpha-2026-10-23-4 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23-4.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23-4.json)

Adds moonedit 0.1.0-alpha.1, the lab's server-side building and terrain editor, to the SMP and DEV servers. It is for server operators only and changes nothing for players: clients do not download it and need no update for it.

- Operators type sentences after `/mo` (select, fill, swap, copy, paste, move, stack, undo and more); edits run in the background while the server keeps ticking. WorldEdit stays installed for now.
- Builds saved with `/mo save as <name>` on one server can be loaded with `/mo load <name>` on the other, so operators can move builds from the SMP to DEV.
- Limited Chunkloading no longer expires the chunk tickets moonedit and vanilla `/forceload` use; with no player near, those chunks were unloaded moments after loading, which broke large edits and forceloaded chunks.

### Added

- [moonedit](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.1/moonedit-neoforge-1.21.1-0.1.0-alpha.1.jar): [0.1.0-alpha.1](https://github.com/virtualonno/miladycraft/releases/download/moonedit-0.1.0-alpha.1/moonedit-neoforge-1.21.1-0.1.0-alpha.1.jar).

### Configuration and other pack files

- Added: config/limitedchunks.json.
- Added: config/moonedit-server.toml.


## 1.6.0-alpha-2026-10-23-3 · 2026-10-23

Pack 1.6.0-alpha · [Recorded mod catalogue](modlist/1.6.0-alpha-2026-10-23-3.md) · [Snapshot](../changelogs/snapshots/1.6.0-alpha-2026-10-23-3.json)

Brings 117 mods and the Complementary Reimagined shaders up to date and moves
the pack to NeoForge 21.1.264.

Player action: when the pack updater asks to update the instance's NeoForge to
21.1.264 (MultiMC and Prism Launcher), choose to update; other launchers need
it set by hand. Supplementaries 4 and Cultural Delights 0.19 require it, and
NeoForge 21.1.260-262 harden networking on both sides.

- Supplementaries 4 (Moonlight 3.7) reworks naval raids and fixes a pulley
  duplication. Spiky bombs are gone; the six on the SMP disappear.
- Cultural Delights 0.19 adds a large set of crops, foods and blocks. It
  disables vanilla mushroom stew, rabbit stew and fermented spider eye
  crafting; the pack restores the vanilla recipes (beetroot soup as before).
  Upper halves of old corn crops (15 on the SMP) vanish; the lower halves stay.
- Chalk 2 adds colored chalk marks and data-driven symbols.
- Amendments 2.2 would make fences connect to walls, panes, bars and nether
  fences; the pack turns both off so existing builds keep their shape.
- EnderDrives 1.5 moves to a new storage format and backs up its database on
  the version change; 1.4.4 had a bug that could zero tape disks.
- Misc Tweaks 1.4 adds stable block drops and stops wolves seeking food by
  default. Simple Music Control 1.5 moved its settings to Fzzy Config; set
  them in its in-game config screen (the old file no longer applied).
- Also updated: the Apotheosis family, FTB Chunks, Teams and Ranks (rank
  commands now need permission level 4), AE2 and its addons, Waystones,
  Immersive Aircraft (keybinds split, flight retuned), Lithostitched (new
  terrain may differ at chunk borders), Complementary Reimagined r5.9.3, and
  about a hundred smaller fixes.
- Removed: Applied Energistics 2 Wireless Terminals. Its file had sat outside
  mods/ since October 2025, so it never loaded.
- Held: Advanced Peripherals 0.8 (alpha; breaks ComputerCraft scripts),
  Polytone 5 (rendering rewrite, released this week), One Enough Block 1.1.4
  (needs an unpublished OELib), and FTB Quests 2101.1.29, FTB Quests Lang
  Splitter, Polymorph and Advanced Loot Info, whose newer versions need newer
  FTB Library, JEI or LootJS than the pack's pinned ones.

### Removed

- [Applied Energistics 2 Wireless Terminals](https://www.curseforge.com/projects/459929): [file 8450398 (version not declared)](https://www.curseforge.com/projects/459929/files/8450398).

### Updated

- [\[UNOFFICIAL\] TaCZ NeoForge Port](https://www.curseforge.com/projects/1353462): [1.1.8-hotfix-r5](https://www.curseforge.com/projects/1353462/files/8520031) → [1.1.8-hotfix-r7](https://www.curseforge.com/projects/1353462/files/9027337); filename: tacz-neoforge-1.21.1-1.1.8-hotfix-r5.jar → tacz-neoforge-1.21.1-1.1.8-hotfix-r7.jar.
- [Adorn (NeoForge/Forge)](https://www.curseforge.com/projects/438784): [6.3.0+1.21.1](https://www.curseforge.com/projects/438784/files/8401042) → [6.3.1+1.21.1](https://www.curseforge.com/projects/438784/files/8539580); filename: Adorn-6.3.0+1.21.1-neoforge.jar → Adorn-6.3.1+1.21.1-neoforge.jar.
- [Advanced Loot Info (ALI)](https://www.curseforge.com/projects/1205426): [1.12.0](https://www.curseforge.com/projects/1205426/files/8168901) → [1.12.0](https://www.curseforge.com/projects/1205426/files/8168901); pinned: False → True.
- [Advanced Peripherals](https://www.curseforge.com/projects/431725): [0.7.62b](https://www.curseforge.com/projects/431725/files/8228816) → [0.7.62b](https://www.curseforge.com/projects/431725/files/8228816); pinned: False → True.
- [Advancement Frames](https://www.curseforge.com/projects/556795): [1.21-2.2.10](https://www.curseforge.com/projects/556795/files/6273038) → [1.21-2.3.2](https://www.curseforge.com/projects/556795/files/9081347); filename: advancementframes-1.21-2.2.10-neoforge.jar → advancementframes-1.21-2.3.2-neoforge.jar.
- [AE2 Import Export Card](https://www.curseforge.com/projects/982512): [1.21.1-1.5.0](https://www.curseforge.com/projects/982512/files/8033654) → [1.21.1-1.9.1](https://www.curseforge.com/projects/982512/files/8961599); filename: ae2importexportcard-1.21.1-1.5.0.jar → ae2importexportcard-1.21.1-1.9.1.jar.
- [AllTheLeaks (Memory Leak Fix)](https://www.curseforge.com/projects/1091339): [1.1.10+1.21.1-neoforge](https://www.curseforge.com/projects/1091339/files/8409394) → [1.1.13+1.21.1-neoforge](https://www.curseforge.com/projects/1091339/files/8943912); filename: alltheleaks-1.1.10+1.21.1-neoforge.jar → alltheleaks-1.1.13+1.21.1-neoforge.jar.
- [Amendments](https://www.curseforge.com/projects/896746): [1.21-2.1.7](https://www.curseforge.com/projects/896746/files/8415430) → [1.21-2.2.0](https://www.curseforge.com/projects/896746/files/9272216); filename: amendments-neoforge-1.21-2.1.7.jar → amendments-1.21-2.2.0-neoforge.jar.
- [Animal Pens](https://www.curseforge.com/projects/1206722): [2.4.3](https://www.curseforge.com/projects/1206722/files/8340147) → [2.5.2](https://www.curseforge.com/projects/1206722/files/9291589); filename: animal\_pen-neoforge-1.21-2.4.3.jar → animal\_pen-neoforge-1.21-2.5.2.jar.
- [Another Furniture](https://www.curseforge.com/projects/610492): [4.0.2](https://www.curseforge.com/projects/610492/files/7355747) → [4.0.3](https://www.curseforge.com/projects/610492/files/8955672); filename: another\_furniture-neoforge-4.0.2.jar → another\_furniture-neoforge-4.0.3.jar.
- [Apotheosis](https://www.curseforge.com/projects/313970): [8.6.0](https://www.curseforge.com/projects/313970/files/8469606) → [8.9.0](https://www.curseforge.com/projects/313970/files/8993983); filename: Apotheosis-1.21.1-8.6.0.jar → Apotheosis-1.21.1-8.9.0.jar.
- [Apothic Attributes](https://www.curseforge.com/projects/898963): [2.10.1](https://www.curseforge.com/projects/898963/files/8502288) → [2.11.0](https://www.curseforge.com/projects/898963/files/9006294); filename: ApothicAttributes-1.21.1-2.10.1.jar → ApothicAttributes-1.21.1-2.11.0.jar.
- [Apothic Enchanting](https://www.curseforge.com/projects/1063926): [1.6.0](https://www.curseforge.com/projects/1063926/files/8469450) → [1.6.4](https://www.curseforge.com/projects/1063926/files/9095862); filename: ApothicEnchanting-1.21.1-1.6.0.jar → ApothicEnchanting-1.21.1-1.6.4.jar.
- [Applied Energistics 2](https://www.curseforge.com/projects/223794): [19.2.17](https://www.curseforge.com/projects/223794/files/7027323) → [19.2.18](https://www.curseforge.com/projects/223794/files/8992605); filename: appliedenergistics2-19.2.17.jar → appliedenergistics2-19.2.18.jar.
- [Applied Flux](https://www.curseforge.com/projects/965012): [1.21-2.1.5-neoforge](https://www.curseforge.com/projects/965012/files/8204513) → [1.21-2.1.7-neoforge](https://www.curseforge.com/projects/965012/files/9288549); filename: AppliedFlux-1.21-2.1.5-neoforge.jar → AppliedFlux-1.21-2.1.7-neoforge.jar.
- [Armor Poser](https://www.curseforge.com/projects/450663): [6.2.3](https://www.curseforge.com/projects/450663/files/7258882) → [6.2.4](https://www.curseforge.com/projects/450663/files/8542862); filename: ArmorPoser-neoforge-1.21.1-6.2.3.jar → ArmorPoser-neoforge-1.21.1-6.2.4.jar.
- [Artifacts](https://www.curseforge.com/projects/312353): [13.2.1](https://www.curseforge.com/projects/312353/files/7875426) → [13.2.5](https://www.curseforge.com/projects/312353/files/8791899); filename: artifacts-neoforge-13.2.1.jar → artifacts-neoforge-13.2.5.jar.
- [Async Logger](https://www.curseforge.com/projects/1491426): [2.2.1+1.21.1-neoforge](https://www.curseforge.com/projects/1491426/files/8503587) → [2.2.3+1.21.1-neoforge](https://www.curseforge.com/projects/1491426/files/9173772); filename: asynclogger-2.2.1+1.21.1-neoforge.jar → asynclogger-2.2.3+1.21.1-neoforge.jar.
- [Bad Horse Fix](https://www.curseforge.com/projects/999835): [3.0.1](https://www.curseforge.com/projects/999835/files/6910122) → [4.0.0](https://www.curseforge.com/projects/999835/files/8932239); filename: badhorsefix-neoforge-3.0.1.jar → badhorsefix-neoforge-4.0.0.jar.
- [Balm](https://www.curseforge.com/projects/531761): [21.0.63](https://www.curseforge.com/projects/531761/files/8424824) → [21.0.66](https://www.curseforge.com/projects/531761/files/8969738); filename: balm-neoforge-1.21.1-21.0.63.jar → balm-neoforge-1.21.1-21.0.66.jar.
- [Bank Storage](https://www.curseforge.com/projects/916710): [1.6.1+1.21](https://www.curseforge.com/projects/916710/files/6759189) → [1.7.0+1.21](https://www.curseforge.com/projects/916710/files/9111450); filename: bankstorage-1.6.1+1.21.jar → bankstorage-1.7.0+1.21.jar.
- [Blueprint](https://www.curseforge.com/projects/382216): [8.1.1](https://www.curseforge.com/projects/382216/files/8397829) → [8.2.0](https://www.curseforge.com/projects/382216/files/8819375); filename: blueprint-1.21.1-8.1.1.jar → blueprint-1.21.1-8.2.0.jar.
- [CC: Tweaked](https://modrinth.com/project/gu7yAYhd): [1.120.0](https://modrinth.com/project/gu7yAYhd/version/8XEJbAee) → [1.120.2](https://modrinth.com/project/gu7yAYhd/version/1ewzHZYg); filename: cc-tweaked-1.21.1-forge-1.120.0.jar → cc-tweaked-1.21.1-forge-1.120.2.jar.
- [Chalk](https://www.curseforge.com/projects/533748): [1.6.12](https://www.curseforge.com/projects/533748/files/8191901) → [2.0.2](https://www.curseforge.com/projects/533748/files/8821479); filename: chalk-1.6.12.jar → chalk-neoforge-1.21.1-2.0.2.jar.
- [Chat Heads](https://www.curseforge.com/projects/407206): [0.15.3](https://www.curseforge.com/projects/407206/files/8486549) → [0.15.7](https://www.curseforge.com/projects/407206/files/8642154); filename: chat\_heads-0.15.3-neoforge-1.21.jar → chat\_heads-0.15.7-neoforge-1.21.jar.
- [Clean Swing Through Grass](https://www.curseforge.com/projects/915308): [1.9](https://www.curseforge.com/projects/915308/files/6153780) → [1.10](https://www.curseforge.com/projects/915308/files/8746293); filename: cleanswing-1.9.jar → cleanswing-1.10-1.21.jar.
- [Client Tweaks](https://www.curseforge.com/projects/251407): [21.1.13](https://www.curseforge.com/projects/251407/files/8370988) → [21.1.15](https://www.curseforge.com/projects/251407/files/8696976); filename: clienttweaks-neoforge-1.21.1-21.1.13.jar → clienttweaks-neoforge-1.21.1-21.1.15.jar.
- [Common Capabilities](https://www.curseforge.com/projects/247007): [2.11.5](https://www.curseforge.com/projects/247007/files/8469575) → [2.11.6](https://www.curseforge.com/projects/247007/files/8859298); filename: commoncapabilities-1.21.1-neoforge-2.11.5-363.jar → commoncapabilities-1.21.1-neoforge-2.11.6.jar.
- [Companion (Neo/Forge)](https://www.curseforge.com/projects/559989): [file 8324374 (version not declared)](https://www.curseforge.com/projects/559989/files/8324374) → [file 8838610 (version not declared)](https://www.curseforge.com/projects/559989/files/8838610); filename: Companion-1.21.1-NeoForge-6.2.2.jar → Companion-1.21.1-NeoForge-6.3.0.jar.
- [Complementary Shaders - Reimagined](https://www.curseforge.com/projects/627557): [file 8123287 (version not declared)](https://www.curseforge.com/projects/627557/files/8123287) → [file 8884654 (version not declared)](https://www.curseforge.com/projects/627557/files/8884654); filename: ComplementaryReimagined\_r5.8.1.zip → ComplementaryReimagined\_r5.9.3.zip.
- [Configurable](https://www.curseforge.com/projects/1092048): [3.5.2](https://www.curseforge.com/projects/1092048/files/8438541) → [3.5.3](https://www.curseforge.com/projects/1092048/files/9191007); filename: configurable-3.5.2+1.21.1-neoforge.jar → configurable-3.5.3+1.21.1-neoforge.jar.
- [Crabber's Delight](https://www.curseforge.com/projects/892827): [1.2.6](https://www.curseforge.com/projects/892827/files/8006190) → [1.3.1](https://www.curseforge.com/projects/892827/files/8996449); filename: crabbersdelight-1.21.1-1.2.6.jar → crabbersdelight-1.21.1-1.3.1.jar.
- [Crafting Tweaks](https://www.curseforge.com/projects/233071): [21.1.10](https://www.curseforge.com/projects/233071/files/8019498) → [21.1.11](https://www.curseforge.com/projects/233071/files/8697050); filename: craftingtweaks-neoforge-1.21.1-21.1.10.jar → craftingtweaks-neoforge-1.21.1-21.1.11.jar.
- [Crash Assistant](https://www.curseforge.com/projects/1154099): [1.11.11](https://www.curseforge.com/projects/1154099/files/8422746) → [1.11.12](https://www.curseforge.com/projects/1154099/files/8636685); filename: CrashAssistant-neoforge-1.20.6-1.21.4-1.11.11.jar → CrashAssistant-neoforge-1.20.6-1.21.4-1.11.12.jar.
- [CraterLib](https://www.curseforge.com/projects/867099): [3.1.2](https://www.curseforge.com/projects/867099/files/8117841) → [3.1.3](https://www.curseforge.com/projects/867099/files/8884785); filename: CraterLib-Neoforge-1.21-3.1.2.jar → CraterLib-Neoforge-1.21-3.1.3.jar.
- [Cultural Delights](https://www.curseforge.com/projects/574622): [0.17.8](https://www.curseforge.com/projects/574622/files/8126191) → [0.19.5](https://www.curseforge.com/projects/574622/files/9259601); filename: culturaldelights-0.17.8.jar → culturaldelights-1.21.1-0.19.5.jar.
- [Cupboard](https://www.curseforge.com/projects/326652): [3.9](https://www.curseforge.com/projects/326652/files/8481114) → [4.2](https://www.curseforge.com/projects/326652/files/8889050); filename: cupboard-1.21.1-3.9.jar → cupboard-1.21.1-4.2.jar.
- [Cyclops Core](https://www.curseforge.com/projects/232758): [1.29.1](https://www.curseforge.com/projects/232758/files/8515031) → [1.30.0](https://www.curseforge.com/projects/232758/files/9239356); filename: cyclopscore-1.21.1-neoforge-1.29.1-1059.jar → cyclopscore-1.21.1-neoforge-1.30.0-1205.jar.
- [Durability Tooltip](https://www.curseforge.com/projects/511040): [1.1.6](https://www.curseforge.com/projects/511040/files/6833316) → [1.2.0](https://www.curseforge.com/projects/511040/files/8830219); filename: durabilitytooltip-1.1.6-neoforge-mc1.21.jar → durabilitytooltip-1.2.0-neoforge-mc1.21.jar.
- [Ears (+ Snouts/Muzzles, Tails, Horns, Wings, and More)](https://www.curseforge.com/projects/412013): [1.4.7](https://www.curseforge.com/projects/412013/files/6166554) → [2.2.1-c](https://www.curseforge.com/projects/412013/files/8853899); filename: ears-neoforge-1.21-1.4.7.jar → ears-buzz-neoforge-2.2.1-c.jar.
- [Easy Villagers](https://www.curseforge.com/projects/400514): [1.21.1-1.1.42](https://www.curseforge.com/projects/400514/files/8066730) → [1.21.1-1.1.49](https://www.curseforge.com/projects/400514/files/9289481); filename: easy-villagers-neoforge-1.21.1-1.1.42.jar → easy-villagers-neoforge-1.21.1-1.1.49.jar.
- [Enchantment Descriptions](https://www.curseforge.com/projects/250419): [21.1.10](https://www.curseforge.com/projects/250419/files/8240827) → [21.1.11](https://www.curseforge.com/projects/250419/files/8693034); filename: enchdesc-neoforge-1.21.1-21.1.10.jar → enchdesc-neoforge-1.21.1-21.1.11.jar.
- [EnderDrives](https://www.curseforge.com/projects/1226739): [1.4.4](https://www.curseforge.com/projects/1226739/files/7033446) → [1.5.23](https://www.curseforge.com/projects/1226739/files/8607939); filename: enderdrives-neoforge-1.21.1-1.4.4.jar → enderdrives-neoforge-1.21.1-1.5.23.jar.
- [Every Compat (Stone Zone)](https://www.curseforge.com/projects/1154622): [1.21-2.11.17](https://www.curseforge.com/projects/1154622/files/8497586) → [1.21-2.11.21](https://www.curseforge.com/projects/1154622/files/9274114); filename: stonezone-1.21-2.11.17-neoforge.jar → stonezone-1.21-2.11.21-neoforge.jar.
- [Every Compat (Wood Good)](https://www.curseforge.com/projects/628539): [1.21-2.11.48](https://www.curseforge.com/projects/628539/files/8509008) → [1.21-2.11.55](https://www.curseforge.com/projects/628539/files/9263267); filename: everycomp-1.21-2.11.48-neoforge.jar → everycomp-1.21-2.11.55-neoforge.jar.
- [Exposure](https://www.curseforge.com/projects/871755): [1.9.18](https://www.curseforge.com/projects/871755/files/8223555) → [1.9.19](https://www.curseforge.com/projects/871755/files/8957000); filename: exposure-neoforge-1.21.1-1.9.18.jar → exposure-neoforge-1.21.1-1.9.19.jar.
- [Exposure: Polaroid](https://www.curseforge.com/projects/1207005): [1.1.5](https://www.curseforge.com/projects/1207005/files/8223623) → [1.1.6](https://www.curseforge.com/projects/1207005/files/8533496); filename: exposure\_polaroid-neoforge-1.21.1-1.1.5.jar → exposure\_polaroid-neoforge-1.21.1-1.1.6.jar.
- [ExtendedAE](https://www.curseforge.com/projects/892005): [1.21-2.2.35-neoforge](https://www.curseforge.com/projects/892005/files/8511901) → [1.21-2.2.41-neoforge](https://www.curseforge.com/projects/892005/files/9087065); filename: ExtendedAE-1.21-2.2.35-neoforge.jar → ExtendedAE-1.21-2.2.41-neoforge.jar.
- [Extreme sound muffler - (Neo)Forge](https://www.curseforge.com/projects/363363): [3.56](https://www.curseforge.com/projects/363363/files/7895926) → [3.57](https://www.curseforge.com/projects/363363/files/9039351); filename: ExtremeSoundMuffler-3.56\_NeoForge-1.21.jar → ExtremeSoundMuffler-3.57\_NeoForge-1.21.jar.
- [Falling Leaves (NeoForge/Forge)](https://www.curseforge.com/projects/463155): [2.5.1](https://www.curseforge.com/projects/463155/files/6240977) → [1.21.1-2.6.0](https://www.curseforge.com/projects/463155/files/9225531); filename: fallingleaves-1.21.1-2.5.1.jar → fallingleaves-1.21.1-2.6.0.jar.
- [Farmer's Delight](https://modrinth.com/project/R2OftAxM): [1.3.2](https://modrinth.com/project/R2OftAxM/version/GbNuOZ4S) → [1.3.4](https://modrinth.com/project/R2OftAxM/version/XTVZDOol); filename: FarmersDelight-1.21.1-1.3.2.jar → FarmersDelight-1.21.1-1.3.4.jar.
- [Farsight \[Forge/Neo\]](https://www.curseforge.com/projects/495693): [5.1](https://www.curseforge.com/projects/495693/files/8192566) → [5.5](https://www.curseforge.com/projects/495693/files/8874976); filename: farsight-1.21.1-5.1.jar → farsight-1.21.1-5.5.jar.
- [Fast IP Ping](https://www.curseforge.com/projects/904356): [1.0.11](https://www.curseforge.com/projects/904356/files/7936390) → [1.0.12](https://www.curseforge.com/projects/904356/files/8905303); filename: fast-ip-ping-v1.0.11-mc1.21.1-neoforge.jar → fast-ip-ping-v1.0.12-mc1.21.1-neoforge.jar.
- [Fast Paintings](https://www.curseforge.com/projects/883287): [1.21-1.3.0](https://www.curseforge.com/projects/883287/files/7305762) → [1.21-1.3.1](https://www.curseforge.com/projects/883287/files/8975088); filename: fastpaintings-1.21-1.3.0-neoforge.jar → fastpaintings-1.21-1.3.1-neoforge.jar.
- [Formations Nether](https://www.curseforge.com/projects/918840): [1.0.5+a](https://www.curseforge.com/projects/918840/files/8451735) → [1.0.5+b](https://www.curseforge.com/projects/918840/files/8858626); filename: formationsnether-1.0.5a-mc1.21+.jar → formationsnether-1.0.5b-mc1.21+.jar.
- [Formations Overworld](https://www.curseforge.com/projects/915324): [1.0.5+a](https://www.curseforge.com/projects/915324/files/8457252) → [1.0.5+c](https://www.curseforge.com/projects/915324/files/8897484); filename: formationsoverworld-1.0.5a-mc1.21+.jar → formationsoverworld-1.0.5c-mc1.21+.jar.
- [FramedBlocks](https://www.curseforge.com/projects/441647): [10.6.1](https://www.curseforge.com/projects/441647/files/8349218) → [10.6.3](https://www.curseforge.com/projects/441647/files/9137677); filename: FramedBlocks-10.6.1.jar → FramedBlocks-10.6.3.jar.
- [FTB Chunks (NeoForge)](https://www.curseforge.com/projects/314906): [2101.1.21](https://www.curseforge.com/projects/314906/files/8520252) → [2101.1.22](https://www.curseforge.com/projects/314906/files/8791113); filename: ftb-chunks-neoforge-2101.1.21.jar → ftb-chunks-neoforge-2101.1.22.jar.
- [FTB Quests (NeoForge)](https://www.curseforge.com/projects/289412): [2101.1.28](https://www.curseforge.com/projects/289412/files/8520042) → [2101.1.29](https://www.curseforge.com/projects/289412/files/8534556); pinned: False → True; filename: ftb-quests-neoforge-2101.1.28.jar → ftb-quests-neoforge-2101.1.29.jar.
- [FTB Ranks (NeoForge)](https://www.curseforge.com/projects/314905): [2101.1.4](https://www.curseforge.com/projects/314905/files/8519426) → [2101.1.5](https://www.curseforge.com/projects/314905/files/8878560); filename: ftb-ranks-neoforge-2101.1.4.jar → ftb-ranks-neoforge-2101.1.5.jar.
- [FTB Teams (NeoForge)](https://www.curseforge.com/projects/404468): [2101.1.10](https://www.curseforge.com/projects/404468/files/7878281) → [2101.1.11](https://www.curseforge.com/projects/404468/files/8724782); filename: ftb-teams-neoforge-2101.1.10.jar → ftb-teams-neoforge-2101.1.11.jar.
- [Fusion (Connected Textures)](https://www.curseforge.com/projects/854949): [1.3.9](https://www.curseforge.com/projects/854949/files/8479774) → [1.3.16](https://www.curseforge.com/projects/854949/files/9070353); filename: fusion-1.3.9-neoforge-mc1.21.1.jar → fusion-1.3.16-neoforge-mc1.21.1.jar.
- [Fzzy Config](https://www.curseforge.com/projects/1005914): [0.7.6+1.21+neoforge](https://www.curseforge.com/projects/1005914/files/7568897) → [0.7.7+1.21+neoforge](https://www.curseforge.com/projects/1005914/files/8883390); filename: fzzy\_config-0.7.6+1.21+neoforge.jar → fzzy\_config-0.7.7+1.21+neoforge.jar.
- [GeckoLib](https://www.curseforge.com/projects/388172): [4.9.2](https://www.curseforge.com/projects/388172/files/8350073) → [4.9.3](https://www.curseforge.com/projects/388172/files/8893490); filename: geckolib-neoforge-1.21.1-4.9.2.jar → geckolib-neoforge-1.21.1-4.9.3.jar.
- [GuideME](https://www.curseforge.com/projects/1173950): [21.1.17](https://www.curseforge.com/projects/1173950/files/8420861) → [21.1.20](https://www.curseforge.com/projects/1173950/files/9292538); filename: guideme-21.1.17.jar → guideme-21.1.20.jar.
- [Heartstone](https://www.curseforge.com/projects/573152): [1.21-1.3.1](https://www.curseforge.com/projects/573152/files/7278328) → [1.21.1-1.4.1](https://www.curseforge.com/projects/573152/files/8668108); filename: heartstone-1.21-1.3.1-neoforge.jar → heartstone-1.21.1-1.4.1-neoforge.jar.
- [Horseman](https://www.curseforge.com/projects/1082085): [1.5.11](https://www.curseforge.com/projects/1082085/files/8299049) → [1.5.13](https://www.curseforge.com/projects/1082085/files/8734097); filename: horseman-neoforge-1.21.1-1.5.11.jar → horseman-neoforge-1.21.1-1.5.13.jar.
- [Hostile Neural Networks](https://www.curseforge.com/projects/552574): [6.5.0](https://www.curseforge.com/projects/552574/files/8463456) → [6.5.1](https://www.curseforge.com/projects/552574/files/8525006); filename: HostileNeuralNetworks-1.21.1-6.5.0.jar → HostileNeuralNetworks-1.21.1-6.5.1.jar.
- [ImmediatelyFast](https://www.curseforge.com/projects/686911): [1.6.11+1.21.1](https://www.curseforge.com/projects/686911/files/8348515) → [1.6.15+1.21.1](https://www.curseforge.com/projects/686911/files/9165518); filename: ImmediatelyFast-NeoForge-1.6.11+1.21.1.jar → ImmediatelyFast-NeoForge-1.6.15+1.21.1.jar.
- [Immersive Aircraft](https://www.curseforge.com/projects/666014): [1.4.6+1.21.1](https://www.curseforge.com/projects/666014/files/8158291) → [1.7.0+1.21.1](https://www.curseforge.com/projects/666014/files/9224351); filename: immersive\_aircraft-1.4.6+1.21.1-neoforge.jar → immersive\_aircraft-neoforge-1.7.0+1.21.1.jar.
- [Immersive Machinery](https://www.curseforge.com/projects/1068736): [0.2.0+1.21.1](https://www.curseforge.com/projects/1068736/files/6495135) → [0.2.3+1.21.1](https://www.curseforge.com/projects/1068736/files/9122617); filename: immersive\_machinery-0.2.0+1.21.1-neoforge.jar → immersive\_machinery-0.2.3+1.21.1-neoforge.jar.
- [Immersive Paintings](https://www.curseforge.com/projects/639584): [0.7.8](https://www.curseforge.com/projects/639584/files/8194870) → [0.7.9](https://www.curseforge.com/projects/639584/files/8871485); filename: immersive\_paintings-neoforge-1.21.1-0.7.8.jar → immersive\_paintings-neoforge-1.21.1-0.7.9.jar.
- [Inventory Essentials](https://www.curseforge.com/projects/368825): [21.1.17](https://www.curseforge.com/projects/368825/files/8362286) → [21.1.20](https://www.curseforge.com/projects/368825/files/9035078); filename: inventoryessentials-neoforge-1.21.1-21.1.17.jar → inventoryessentials-neoforge-1.21.1-21.1.20.jar.
- [Iris/Oculus Shader Folder](https://www.curseforge.com/projects/1351246): [1.4.1-neoforge](https://www.curseforge.com/projects/1351246/files/8512633) → [1.4.3-neoforge](https://www.curseforge.com/projects/1351246/files/9195489); filename: iris\_shader\_folder-1.4.1-neoforge.jar → iris\_shader\_folder-1.4.3-neoforge.jar.
- [Iron's Lib](https://modrinth.com/project/9nfaJPtX): [1.21.1-2.1.0](https://modrinth.com/project/9nfaJPtX/version/sQyzhxuH) → [1.21.1-2.2.0](https://modrinth.com/project/9nfaJPtX/version/lUwUKYPl); filename: irons\_lib-1.21.1-2.1.0.jar → irons\_lib-1.21.1-2.2.0.jar.
- [Iron's Spells 'n Spellbooks](https://www.curseforge.com/projects/855414): [1.21.1-3.16.2](https://www.curseforge.com/projects/855414/files/8364935) → [1.21.1-3.16.3](https://www.curseforge.com/projects/855414/files/8680204); filename: irons\_spellbooks-1.21.1-3.16.2.jar → irons\_spellbooks-1.21.1-3.16.3.jar.
- [Ixeris](https://www.curseforge.com/projects/1285307): [4.6.0+1.21.1-neoforge](https://www.curseforge.com/projects/1285307/files/8513442) → [4.6.10+1.21.1-neoforge](https://www.curseforge.com/projects/1285307/files/9254050); filename: Ixeris-4.6.0+1.21.1-neoforge.jar → Ixeris-4.6.10+1.21.1-neoforge.jar.
- [Jade Addons (Neo/Forge)](https://www.curseforge.com/projects/583345): [6.1.0+neoforge](https://www.curseforge.com/projects/583345/files/6315149) → [6.1.2+neoforge](https://www.curseforge.com/projects/583345/files/9056575); filename: JadeAddons-1.21.1-NeoForge-6.1.0.jar → JadeAddons-1.21.1-NeoForge-6.1.2.jar.
- [Jade](https://www.curseforge.com/projects/324717): [15.10.5+neoforge](https://www.curseforge.com/projects/324717/files/7545219) → [15.10.6+neoforge](https://www.curseforge.com/projects/324717/files/8591319); filename: Jade-1.21.1-NeoForge-15.10.5.jar → Jade-1.21.1-NeoForge-15.10.6.jar.
- [Jasione](https://www.curseforge.com/projects/1595495): [1.0.6+1.21.1-neoforge](https://www.curseforge.com/projects/1595495/files/8492831) → [1.0.9+1.21.1-neoforge](https://www.curseforge.com/projects/1595495/files/9036008); filename: jasione-1.0.6+1.21.1-neoforge.jar → jasione-1.0.9+1.21.1-neoforge.jar.
- [Kaleidoscope Cookery](https://www.curseforge.com/projects/1309203): [1.4.1-neoforge+mc1.21.1](https://www.curseforge.com/projects/1309203/files/8266772) → [1.6.0-neoforge+mc1.21.1](https://www.curseforge.com/projects/1309203/files/9019242); filename: kaleidoscopecookery-1.4.1-neoforge+mc1.21.1.jar → kaleidoscopecookery-1.6.0-neoforge+mc1.21.1.jar.
- [Kaleidoscope Doll](https://www.curseforge.com/projects/1233277): [1.4.1-neoforge+mc1.21.1](https://www.curseforge.com/projects/1233277/files/8196011) → [1.4.2-neoforge+mc1.21.1](https://www.curseforge.com/projects/1233277/files/9019449); filename: kaleidoscopedoll-1.4.1-neoforge+mc1.21.1.jar → kaleidoscopedoll-1.4.2-neoforge+mc1.21.1.jar.
- [L\_Ender 's Cataclysm](https://www.curseforge.com/projects/551586): [3.32](https://www.curseforge.com/projects/551586/files/8364209) → [3.33](https://www.curseforge.com/projects/551586/files/8931182); filename: L\_Ender's Cataclysm 1.21.1-3.32.jar → L\_Ender's Cataclysm 1.21.1-3.33.jar.
- [Laser Bridges & Doors \[Fabric/Forge/NeoForge\]](https://www.curseforge.com/projects/776337): [5.3](https://www.curseforge.com/projects/776337/files/7150038) → [6.2](https://www.curseforge.com/projects/776337/files/9182998); filename: laserbridges-1.21.1-neoforge-5.3.jar → laserbridges-1.21.1-neoforge-6.2.jar.
- [Leaky - Item Lag Fix](https://www.curseforge.com/projects/856906): [2.4](https://www.curseforge.com/projects/856906/files/7392199) → [3.6](https://www.curseforge.com/projects/856906/files/9259502); filename: leaky-1.21-2.4.jar → leaky-1.21-3.6.jar.
- [Lithostitched](https://modrinth.com/project/XaDC71GB): [1.7.13](https://modrinth.com/project/XaDC71GB/version/qPASucBM) → [1.8.1](https://modrinth.com/project/XaDC71GB/version/cZu4cHY3); filename: lithostitched-1.7.13-neoforge-21.1.jar → lithostitched-1.8.1-neoforge-21.1.jar.
- [Login Protection](https://www.curseforge.com/projects/358304): [3.5](https://www.curseforge.com/projects/358304/files/6293744) → [3.6](https://www.curseforge.com/projects/358304/files/8824987); filename: logprot-1.21-3.5.jar → logprot-1.21.1-3.6.jar.
- [Lootr (Forge & NeoForge)](https://www.curseforge.com/projects/361276): [1.21.1-1.11.37.122](https://www.curseforge.com/projects/361276/files/8428025) → [1.21.1-1.11.38.127](https://www.curseforge.com/projects/361276/files/8968561); filename: lootr-neoforge-1.21.1-1.11.37.122.jar → lootr-neoforge-1.21.1-1.11.38.127.jar.
- [ME Requester](https://www.curseforge.com/projects/688367): [1.21.1-1.4.3](https://www.curseforge.com/projects/688367/files/8285803) → [1.21.1-1.5.0](https://www.curseforge.com/projects/688367/files/8787722); filename: merequester-neoforge-1.21.1-1.4.3.jar → merequester-neoforge-1.21.1-1.5.0.jar.
- [Misc Tweaks](https://www.curseforge.com/projects/1227334): [1.3.0](https://www.curseforge.com/projects/1227334/files/7696312) → [1.4.5](https://www.curseforge.com/projects/1227334/files/8962822); filename: misctweaks-1.3.0+1.21.1-neoforge.jar → misctweaks-neoforge-1.4.5+1.21.1.jar.
- [MmmMmmMmmMmm (Target Dummy)](https://www.curseforge.com/projects/225738): [1.21-2.1.0](https://www.curseforge.com/projects/225738/files/8510632) → [1.21-2.1.2](https://www.curseforge.com/projects/225738/files/8903254); filename: dummmmmmy-neoforge-1.21-2.1.0.jar → dummmmmmy-1.21-2.1.2-neoforge.jar.
- [ModernFix](https://www.curseforge.com/projects/790626): [5.27.20+mc1.21.1](https://www.curseforge.com/projects/790626/files/8459650) → [5.27.26+mc1.21.1](https://www.curseforge.com/projects/790626/files/9101836); filename: modernfix-neoforge-5.27.20+mc1.21.1.jar → modernfix-neoforge-5.27.26+mc1.21.1.jar.
- [Moonlight Lib](https://www.curseforge.com/projects/499980): [1.21.1-3.3.0](https://www.curseforge.com/projects/499980/files/8510630) → [1.21.1-3.7.2](https://www.curseforge.com/projects/499980/files/9122548); filename: moonlight-neoforge-1.21.1-3.3.0.jar → moonlight-1.21.1-3.7.2-neoforge.jar.
- [Moyai](https://www.curseforge.com/projects/577252): [1.21-2.1.7](https://www.curseforge.com/projects/577252/files/6475137) → [1.21-2.1.7](https://www.curseforge.com/projects/577252/files/8971491) (artifact changed; version label unchanged).
- [Neruina - Ticking Entity Fixer](https://www.curseforge.com/projects/851046): [3.3.3](https://www.curseforge.com/projects/851046/files/8451084) → [3.3.5](https://www.curseforge.com/projects/851046/files/9220575); filename: neruina-3.3.3+1.21.1-neoforge.jar → neruina-3.3.5+1.21.1-neoforge.jar.
- [Not Enough Animations](https://modrinth.com/project/MPCX6s5C): [1.12.4](https://modrinth.com/project/MPCX6s5C/version/eYNogep3) → [1.12.6](https://modrinth.com/project/MPCX6s5C/version/VCuMsK45); filename: notenoughanimations-neoforge-1.12.4-mc1.21.1.jar → notenoughanimations-neoforge-1.12.6-mc1.21.1.jar.
- [One Enough Block](https://www.curseforge.com/projects/1356867): [1.1.2-hotfix](https://www.curseforge.com/projects/1356867/files/7471732) → [1.1.2-hotfix](https://www.curseforge.com/projects/1356867/files/7471732); pinned: False → True.
- [Placebo](https://www.curseforge.com/projects/283644): [9.9.2](https://www.curseforge.com/projects/283644/files/8463693) → [9.9.4](https://www.curseforge.com/projects/283644/files/9153039); filename: Placebo-1.21.1-9.9.2.jar → Placebo-1.21.1-9.9.4.jar.
- [Polymorph (Fabric/Forge/Quilt)](https://www.curseforge.com/projects/388800): [1.1.0+1.21.1](https://www.curseforge.com/projects/388800/files/6794589) → [1.1.0+1.21.1](https://www.curseforge.com/projects/388800/files/6794589); pinned: False → True.
- [Polytone](https://www.curseforge.com/projects/958094): [1.21-3.10.3](https://www.curseforge.com/projects/958094/files/8517029) → [1.21-3.10.3](https://www.curseforge.com/projects/958094/files/8517029); pinned: False → True.
- [Portfolio](https://www.curseforge.com/projects/851131): [1.21.1-1.5.5-neoforge](https://www.curseforge.com/projects/851131/files/7689313) → [1.21.1-1.6.0-neoforge](https://www.curseforge.com/projects/851131/files/8634873); filename: portfolio-1.21.1-1.5.5-neoforge.jar → portfolio-1.21.1-1.6.0-neoforge.jar.
- [Pufferfish's Skills \[Fabric & Forge & NeoForge\]](https://www.curseforge.com/projects/835091): [0.18.2](https://www.curseforge.com/projects/835091/files/8507667) → [0.19.2](https://www.curseforge.com/projects/835091/files/9101377); filename: puffish\_skills-0.18.2-1.21-neoforge.jar → puffish\_skills-0.19.2-1.21-neoforge.jar.
- [Quests Lang Splitter](https://www.curseforge.com/projects/1326856): [1.0.5](https://www.curseforge.com/projects/1326856/files/6975768) → [1.0.5](https://www.curseforge.com/projects/1326856/files/6975768); pinned: False → True.
- [Railcraft Reborn](https://www.curseforge.com/projects/901491): [1.2.10](https://www.curseforge.com/projects/901491/files/7393678) → [1.2.13](https://www.curseforge.com/projects/901491/files/9257943); filename: railcraft-reborn-1.21.1-1.2.10.jar → railcraft-reborn-1.21.1-1.2.13.jar.
- [Rechiseled](https://www.curseforge.com/projects/558998): [1.2.5](https://www.curseforge.com/projects/558998/files/8301793) → [1.2.6](https://www.curseforge.com/projects/558998/files/8875899); filename: rechiseled-1.2.5-neoforge-mc1.21.jar → rechiseled-1.2.6-neoforge-mc1.21.jar.
- [Respawning Structures](https://www.curseforge.com/projects/969937): [4.2](https://www.curseforge.com/projects/969937/files/8026289) → [4.4](https://www.curseforge.com/projects/969937/files/8528892); filename: respawningstructures-1.21.1-4.2.jar → respawningstructures-1.21.1-4.4.jar.
- [Rustic Delight](https://modrinth.com/project/foa4fGIH): [1.7.0](https://modrinth.com/project/foa4fGIH/version/pTszhct3) → [1.7.1](https://modrinth.com/project/foa4fGIH/version/sAaG4pSA); filename: rusticdelight-neoforge-1.21-1.7.0.jar → rusticdelight-neoforge-1.21-1.7.1.jar.
- [Sawmill](https://www.curseforge.com/projects/964817): [1.21-1.7.7](https://www.curseforge.com/projects/964817/files/8279292) → [1.21-1.8.1](https://www.curseforge.com/projects/964817/files/8779294); filename: sawmill-neoforge-1.21-1.7.7.jar → sawmill-1.21-1.8.1-neoforge.jar.
- [ScalableLux](https://www.curseforge.com/projects/1055925): [0.3.0-alpha.0.6+1.21.1](https://www.curseforge.com/projects/1055925/files/8417608) → [0.3.0-alpha.0.8+1.21.1](https://www.curseforge.com/projects/1055925/files/8662561); filename: ScalableLux-neoforge-0.3.0-alpha.0.6-all.jar → ScalableLux-neoforge-0.3.0-alpha.0.8-all.jar.
- [Scholar](https://www.curseforge.com/projects/961802): [1.2.3](https://www.curseforge.com/projects/961802/files/8278034) → [1.2.10](https://www.curseforge.com/projects/961802/files/9154700); filename: scholar-neoforge-1.21.1-1.2.3.jar → scholar-neoforge-1.21.1-1.2.10.jar.
- [Server Performance - Smooth Chunk Save](https://www.curseforge.com/projects/582327): [4.1](https://www.curseforge.com/projects/582327/files/6296628) → [4.4](https://www.curseforge.com/projects/582327/files/9255092); filename: smoothchunk-1.21-4.1.jar → smoothchunk-1.21-4.4.jar.
- [Simple Discord Link Bot](https://www.curseforge.com/projects/541320): [3.4.4](https://www.curseforge.com/projects/541320/files/8437065) → [3.4.5](https://www.curseforge.com/projects/541320/files/8884966); filename: SimpleDiscordLink-Universal-3.4.4.jar → SimpleDiscordLink-Universal-3.4.5.jar.
- [Simple Music Control](https://www.curseforge.com/projects/1185599): [1.3.7](https://www.curseforge.com/projects/1185599/files/6742209) → [1.5.5](https://www.curseforge.com/projects/1185599/files/9130406); filename: simple\_music\_control-1.3.7+1.21.1.jar → simple\_music\_control-neoforge-1.5.5+1.21.1.jar.
- [Simple Voice Chat](https://www.curseforge.com/projects/416089): [1.21.1-2.6.21; 2.6.20](https://www.curseforge.com/projects/416089/files/8464096) → [1.21.1-2.6.24; 2.6.24](https://www.curseforge.com/projects/416089/files/8928478); filename: voicechat-neoforge-1.21.1-2.6.21.jar → voicechat-neoforge-1.21.1-2.6.24.jar.
- [Storage Delight (Forge & Neoforge)](https://www.curseforge.com/projects/979761): [26.07.01a-1.21-neoforge](https://www.curseforge.com/projects/979761/files/8390991) → [26.09.17-1.21-neoforge](https://www.curseforge.com/projects/979761/files/8908145); filename: storagedelight-26.07.01a-1.21-neoforge.jar → storagedelight-26.09.17-1.21-neoforge.jar.
- [Structure Essentials](https://www.curseforge.com/projects/832882): [5.0](https://www.curseforge.com/projects/832882/files/7962596) → [5.1](https://www.curseforge.com/projects/832882/files/9278578); filename: structureessentials-1.21.1-5.0.jar → structureessentials-1.21.1-5.1.jar.
- [SuperMartijn642's Core Lib](https://www.curseforge.com/projects/454372): [1.1.21](https://www.curseforge.com/projects/454372/files/7783425) → [1.1.25](https://www.curseforge.com/projects/454372/files/9083552); filename: supermartijn642corelib-1.1.21-neoforge-mc1.21.jar → supermartijn642corelib-1.1.25-neoforge-mc1.21.jar.
- [Supplementaries](https://www.curseforge.com/projects/412082): [1.21.1-3.8.4](https://www.curseforge.com/projects/412082/files/8501612) → [1.21.1-4.0.2](https://www.curseforge.com/projects/412082/files/9211734); filename: supplementaries-neoforge-1.21.1-3.8.4.jar → supplementaries-1.21.1-4.0.2-neoforge.jar.
- [Tide 2](https://www.curseforge.com/projects/884685): [2.1](https://www.curseforge.com/projects/884685/files/8295525) → [2.1.1](https://www.curseforge.com/projects/884685/files/8570111); filename: tide-neoforge-1.21.1-2.1.jar → tide-neoforge-1.21.1-2.1.1.jar.
- [Titanium](https://www.curseforge.com/projects/287342): [4.0.45](https://www.curseforge.com/projects/287342/files/8426819) → [4.0.51](https://www.curseforge.com/projects/287342/files/9129904); filename: titanium-1.21-4.0.45.jar → titanium-1.21-4.0.51.jar.
- [Torchmaster](https://www.curseforge.com/projects/254268): [21.1.9](https://www.curseforge.com/projects/254268/files/7197218) → [21.1.13](https://www.curseforge.com/projects/254268/files/8949981); filename: torchmaster-neoforge-1.21.1-21.1.9.jar → torchmaster-neoforge-1.21.1-21.1.13.jar.
- [Trade Cycling](https://www.curseforge.com/projects/570431): [1.21.1-1.0.18](https://www.curseforge.com/projects/570431/files/6497876) → [1.21.1-1.0.23](https://www.curseforge.com/projects/570431/files/9155549); filename: trade-cycling-neoforge-1.21.1-1.0.18.jar → trade-cycling-neoforge-1.21.1-1.0.23.jar.
- [TslatEntityStatus (TES)](https://www.curseforge.com/projects/830420): [1.8.3](https://www.curseforge.com/projects/830420/files/7115952) → [1.8.5](https://www.curseforge.com/projects/830420/files/8987787); filename: TES-neoforge-1.21.1-1.8.3.jar → tslatentitystatus-neoforge-1.21.1-1.8.5.jar.
- [Waystones](https://www.curseforge.com/projects/245755): [21.1.38](https://www.curseforge.com/projects/245755/files/8498220) → [21.1.46](https://www.curseforge.com/projects/245755/files/8969751); filename: waystones-neoforge-1.21.1-21.1.38.jar → waystones-neoforge-1.21.1-21.1.46.jar.
- [YUNG's API (NeoForge) \[1.20.4-1.21.1 ONLY\]](https://www.curseforge.com/projects/1015100): [1.21.1-NeoForge-5.1.6](https://www.curseforge.com/projects/1015100/files/6715463) → [1.21.1-NeoForge-5.1.9](https://www.curseforge.com/projects/1015100/files/8894736); filename: YungsApi-1.21.1-NeoForge-5.1.6.jar → YungsApi-1.21.1-NeoForge-5.1.9.jar.

### Pack and loader

- \{"name": "Miladycraft", "version": "1.6.0-alpha", "versions": \{"minecraft": "1.21.1", "neoforge": "21.1.244"\}\} → \{"name": "Miladycraft", "version": "1.6.0-alpha", "versions": \{"minecraft": "1.21.1", "neoforge": "21.1.264"\}\}

### Configuration and other pack files

- Added: config/amendments-common.toml.
- Removed: config/simple\_music\_control-client.toml.
- Removed: desktop.ini.
- Added: kubejs/data/minecraft/recipe/fermented\_spider\_eye.json.
- Added: kubejs/data/minecraft/recipe/mushroom\_stew.json.
- Added: kubejs/data/minecraft/recipe/rabbit\_stew\_from\_brown\_mushroom.json.
- Added: kubejs/data/minecraft/recipe/rabbit\_stew\_from\_red\_mushroom.json.


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
