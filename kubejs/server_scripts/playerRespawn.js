PlayerEvents.respawned( event => {
    playerCombatRespawn(event)
})

//Removing Player Combat on respawn -> getting killed (in PvP) deems combat to be over (does not apply to Flagged)
function playerCombatRespawn(event) {
    if(event.player.persistentData.effectstorage.length){
        for(let j = 0; j < event.player.persistentData.effectstorage.length; j++){
            if((event.player.persistentData.effectstorage[j]['forge:id']) == 'kubejs:player_combat'){
                event.player.persistentData.effectstorage[j].Duration = 1
            }
        }
    }
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.


