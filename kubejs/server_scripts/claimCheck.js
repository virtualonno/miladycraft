ItemEvents.rightClicked('kubejs:claim_tool', event =>{
   const { player, item, server } = event
   let getClaim = new $Claimstorage.get(player.getLevel()).getClaimAt(player.blockPosition())
   if(getClaim == null){
       return
   }
   else{
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