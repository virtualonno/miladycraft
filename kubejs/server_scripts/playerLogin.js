PlayerEvents.loggedIn( event => {
    let player = event.player
    if (player.persistentData.princess == undefined){event.player.persistentData.princess = 0}

    if (player.persistentData.princess == 1){player.potionEffects.add('kubejs:princess', 600000, 0, true, false)}
    else if (player.hasEffect('kubejs:player_combat')){ // Princess immunity against Player Combat trigger for Deserter
        // see playerRespawn for function, removes Player Combat
        playerCombatLogin(event)
        player.potionEffects.add('kubejs:deserter', 72000, 0, false, false)
    }
})

//Removing Player Combat on login -> Deserter trigger, clear effect to engender duration overwrite and end Player Combat
function playerCombatLogin(event) {
    if(event.player.persistentData.effectstorage.length){
        for(let j = 0; j < event.player.persistentData.effectstorage.length; j++){
            if((event.player.persistentData.effectstorage[j]['forge:id']) == 'kubejs:player_combat'){
                event.player.persistentData.effectstorage[j].Duration = 1
                event.player.potionEffects.clear()
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