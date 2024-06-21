const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
global.CuriosApi = new CuriosApi();

//deprecated in 1.20.1, switch to new method
ForgeEvents.onEvent("top.theillusivec4.curios.api.event.CurioChangeEvent", event => {
        global.backpackEquip(event)
    })

    /** @arg {Internal.CurioChangeEvent} event */
  global.backpackEquip= event => {
    let player = event.entity
    if (!player.server) return
    if((event.getIdentifier() == 'curio') && (event.to.id == 'backpacked:backpack')){
         for(let i = 0; i < player.nbt.ForgeCaps['curios:inventory'].Curios.length; i++){
            if(player.nbt.ForgeCaps['curios:inventory'].Curios[i].Identifier == 'back'){
                if(player.nbt.ForgeCaps['curios:inventory'].Curios[i].StacksHandler.Stacks.Items[0] == undefined){
                    let item = event.to.id
                    let nbt = event.to.nbtString
                    global.CuriosApi.getCuriosHelper().setEquippedCurio(player, 'back', 0, Item.of(`${item}`, `${nbt}`))
                    event.to.count--
                }
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