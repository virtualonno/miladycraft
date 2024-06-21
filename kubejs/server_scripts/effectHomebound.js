const $Claimstorage = Java.loadClass("io.github.flemmli97.flan.claim.ClaimStorage")
const $PermissionRegistry = Java.loadClass("io.github.flemmli97.flan.api.permission.PermissionRegistry")

let tick_count_claims = 0
let breakPermission = new $PermissionRegistry

ServerEvents.tick(event => {
   tick_count_claims++
   if (tick_count_claims % 20 == 0) { // every 20 tick, because we don't want to ruin performance
    

       event.server.players.forEach(player => { // iterate by every player on server
            if (player.isSpectator()) {
               return; // next loop iteration
            }
            // check whether player is inside a claim or not
            let getClaim = new $Claimstorage.get(player.getLevel()).getClaimAt(player.blockPosition())
            if(getClaim == null){
                return
            }
            // Homebound is applied when the respective claim has 'BREAK' permission enabled for the player
            else if(getClaim.canInteract(player, breakPermission.BREAK, player.blockPosition())){
                player.potionEffects.add('kubejs:homebound', 200, 0, true, false)
            }
            else{
                return;
            }
       })
   }
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.