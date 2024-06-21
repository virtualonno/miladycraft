let explosionImmuneEntities = new Set([
   'minecraft:item_frame',
   'minecraft:glow_item_frame',
   'camera:image_frame',
   'quark:glass_frame',
   'quark:dyed_item_frame',
   'mannequins:mannequin',
   'mannequins:statue',
   'xercapaint:easel',
   'xercapaint:canvas',
   'immersive_paintings:painting',
   'immersive_paintings:glow_painting',
   'immersive_paintings:graffiti',
   'immersive_paintings:glow_graffiti',
   'exposure:photograph',
   'simplehats:hatdisplay'
])




ForgeEvents.onEvent('net.minecraftforge.event.level.ExplosionEvent$Detonate', event => {
	global.explosionProtection(event)
})

global.explosionProtection = event => {
   let affectedEntities= event.getAffectedEntities()

   affectedEntities = affectedEntities.filter(mob => !explosionImmuneEntities.has(`${mob.type}`));
   //console.log(affectedEntities)

   event.getAffectedEntities().clear()
   event.getAffectedEntities().addAll(affectedEntities)
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.


