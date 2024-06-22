
// Registry remapping has been removed as per Neoforge 1.20.4+, but equivalent solutions exist for it
// If you somehow want to undo these changes, e.g. by readdition of the mod, clear the registries in level.dat
// as the remapped registries will otherwise turn your reexisting modded item/block to its previous replacement!
// Replacements will not be removed when registries are cleared, ergo it is relatively safe to do so.

ForgeEvents.onEvent('net.minecraftforge.registries.MissingMappingsEvent', event => {
	global.missingMappings(event)
})

global.missingMappings = event => {
  console.log('kubejs missing mappings!')
  if(event.registry.registryName != 'minecraft:item') return
  // MissingMappingsEvent is not fired per mapping & mappings are dynamically assigned, so manually find the mapping you wish to replace
  // Items try to retain their NBT data when remapped
  event.getMappings(event.registry.registryKey, "byg").forEach(mapping => {
    if (bygMap.has(`${mapping.key}`)) {
      mapping.remap(Item.of(bygMap.get(`${mapping.key}`)).item)
    }
  })
}

let bygMap = new Map([
  ['byg:mangrove_log', 'byg:white_mangrove_log'],
  ['byg:mangrove_leaves','byg:white_mangrove_leaves']
])


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.
