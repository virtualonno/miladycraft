ItemEvents.rightClicked('kubejs:duelist_stone', event =>{
   const { player, item, server } = event
   if (player.cooldowns.isOnCooldown(item)) {return}
   server.runCommandSilent(`execute as ${player.username} run playsound minecraft:block.end_gateway.spawn player @s ${player.x} ${player.y} ${player.z} 1 1`)
   server.runCommandSilent(`/team join duelist ${player.name.getString()}`)
   player.potionEffects.add('kubejs:flagged', 6000, 0, false, false)
   player.potionEffects.add('minecraft:glowing', 6000, 0, true, false)
   player.addItemCooldown(item, 600)
   item.count--
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.