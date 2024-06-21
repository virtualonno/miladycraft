
let deserterTick = 0

PlayerEvents.tick( event =>{
   deserterTick++
   if (deserterTick % 20 == 0){
      if(event.player.hasEffect('kubejs:deserter')){}
      else if (event.player.hasEffect('minecraft:glowing')){
         if(event.player.getTeam())
            {
               if(event.player.hasEffect('kubejs:flagged')){
                  deserterTick = 0
                  return
               }
               event.player.server.runCommandSilent(`/team leave ${event.player.name.getString()}`)
            }
         deserterTick = 0
         return
      }
      else{
         deserterTick = 0
         return
      }
      if(!event.player.getTeam() || (event.player.getTeam().name == 'duelist'))
      {
         event.player.server.runCommandSilent(`/team join deserter ${event.player.name.getString()}`)
      }
      event.player.potionEffects.add('minecraft:glowing', 200, 0, true, false)
      deserterTick = 0
      return
      }
   })


ServerEvents.loaded( event => {
   event.server.runCommandSilent(`/team add deserter`)
   event.server.runCommandSilent(`/team modify deserter color aqua`)
   event.server.runCommandSilent(`/team modify deserter friendlyFire true`)
   event.server.runCommandSilent(`/team modify deserter seeFriendlyInvisibles false`)

   event.server.runCommandSilent(`/team add duelist`)
   event.server.runCommandSilent(`/team modify duelist color red`)
   event.server.runCommandSilent(`/team modify duelist friendlyFire true`)
   event.server.runCommandSilent(`/team modify duelist seeFriendlyInvisibles false`)
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.