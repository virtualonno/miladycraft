
let erroredMods = JsonIO.read('kubejs/data/kubejs/dev/mods.json')


ClientEvents.loggedIn( event => {
   console.log(Platform.getMods().keySet())
   console.log(erroredMods.values)
   erroredMods.values.forEach(mod => {
      if(Platform.isLoaded(mod)){
         if (Client.player){
            Client.player.sendData('errorDetected', {stuff: 1})
         }
      }
   })
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.