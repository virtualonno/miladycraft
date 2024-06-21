EntityEvents.hurt('minecraft:player', event =>{
   let attacker = event.source.getActual()
   if (attacker){
      if (attacker == event.entity){
         //console.log('returned!')
         return
      }
      if (attacker.isPlayer()){
         //console.log(event.entity)
         //console.log(attacker)
         //potionEffects.add(effect, duration, amplifier, ambient, showParticles)

         // Homebound is active inside claims, prevents PvP between players if neither have Flagged and/or Deserter, Homebound is locked to claim permission 'BREAK'
         if((event.entity.hasEffect('kubejs:homebound')) && (!event.entity.hasEffect('kubejs:flagged')) && (!event.entity.hasEffect('kubejs:deserter'))){
            // note that because Deserter assigns a team, those with the effect cannot deal damage to themselves even though friendly fire is on
            event.cancel();
            return
         }

         if(!attacker.hasEffect('kubejs:princess')){
         attacker.potionEffects.add('kubejs:flagged', 6000, 0, false, false)
         }
         event.entity.potionEffects.add('kubejs:player_combat', 600, 0, false, false)
         attacker.potionEffects.add('kubejs:player_combat', 600, 0, false, false)
      }
      return
   }
})

let effectList = [
   'minecraft:invisibility',
   'irons_spellbooks:true_invisibility'
]

let flaggedTick = 0

PlayerEvents.tick( event =>{
   flaggedTick++
   if (flaggedTick % 10 == 0){
      if(!event.player.hasEffect('kubejs:flagged')){
         flaggedTick = 0
         return
      }
       if (effectList.some(list => {
           return event.player.hasEffect(list)
           })){ 
            flaggedTick = 0
            return
           }
       //particle when flagged for visibility by others, cancelled if invisible
       event.server.runCommandSilent(`/particle minecraft:end_rod ${event.player.x} ${event.player.y + 0.75} ${event.player.z} 0.25 0.25 0.25 0 3`)
       flaggedTick = 0
       return
   }
   

})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.