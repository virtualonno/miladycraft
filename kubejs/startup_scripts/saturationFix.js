// Script to rebalance saturation as a game mechanic: in Miladycraft, players can eat food independent of hunger value
// This leads to devaluation of individual foods, and furthermore the ability to top up saturation when hunger is full
// Since saturation regeneration/healing is very fast, this can be quite powerful
// Instead, eating when full now lowers saturation. Intended to be both a mechanic for forcing saturation (eat more to get hungry lol)
// as well as to account for changes in saturation inbetween eating, from healing and other effects; mitigate exploitation
// NOTE: this saturation change doesn't apply to placed foods like Cakes!

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Start', event => {
	global.saturationStart(event)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish', event => {
	global.saturationFix(event)
})


global.saturationFix = event => {
    let player = event.entity
    //if (!player.server) return
    let itemstack = event.getItem()
    let foodProperties = itemstack.getFoodProperties(player) != undefined ? itemstack.getFoodProperties(player) : null;
    if(foodProperties && (player.foodData.getLastFoodLevel() >= 20)){
        let lastSaturation = player.persistentData.lastSaturationLevel
        if(foodProperties.isFastFood()){
            // Lower saturation reduction for foods like Cookies because they are eaten faster accordingly, eaten at 18 ticks
            player.foodData.setSaturation(((lastSaturation - 2.5) > 0 ? (lastSaturation - 2.5) : 0))  
        }
        else{
            // Normal food is eaten at 32 ticks
            player.foodData.setSaturation(((lastSaturation - 5) > 0 ? (lastSaturation - 5) : 0))   
        }

    }   
}

global.saturationStart = event => {
    let player = event.entity
    // both client and server to possibly prevent clientside visual bugs with Appleskin
    //if (!player.server) return
    let itemstack = event.getItem()
    let foodProperties = itemstack.getFoodProperties(player) != undefined ? itemstack.getFoodProperties(player) : null;
    if(foodProperties){
        //console.log('saturation of this food is:',foodProperties.getSaturationModifier())
        if (player.persistentData.lastSaturationLevel == undefined){player.persistentData.lastSaturationLevel = 0.0}
        player.persistentData.lastSaturationLevel = player.foodData.getSaturationLevel()
        }
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.
