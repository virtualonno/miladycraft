const $MobEffectInstance = Java.loadClass(`net.minecraft.world.effect.MobEffectInstance`);

//minor optimization due to how effects are called; instead of 'kubejs:flagged'
let immuneEffects = [
    'effect.kubejs.flagged',
    'effect.kubejs.deserter',
    'effect.kubejs.princess',
    'effect.kubejs.player_combat',
    'effect.kubejs.ominous_presence',
    'effect.kubejs.homebound',
    'effect.kubejs.sanctuary',
    'effect.alexscaves.irradiated'
]

let milkItems = [
	'caverns_and_chasms:golden_milk_bucket',
    'neapolitan:milk_bottle',
    'farmersdelight:milk_bottle',
    'minecraft:milk_bucket',
    'miners_delight:milk_cup',
    'windswept:wooden_milk_bucket'
]

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Start', event => {
	global.milkStart(event)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish', event => {
	global.milkImmunity(event)
})


global.milkImmunity = event => {
    let player = event.entity
    if (!player.server) return
    let itemstack = event.getItem()

	if (!milkItems.some(id => {
    return itemstack.id == id
    })) return

    for(let j = 0; j < player.persistentData.effectstorage.length; j++){
        //const mobEffect = new $MobEffectInstance($MobEffectInstance.load());
        player.addEffect($MobEffectInstance.load(player.persistentData.effectstorage[j]), player)
    }
}

global.milkStart = event => {
    let player = event.entity
    if (!player.server) return
    let itemstack = event.getItem()

	if (!milkItems.some(id => {
    return itemstack.id == id
    })) return

    let effectArray = []
    let i = 0 
    player.activeEffects.forEach(effect => {
        if (!immuneEffects.some(effectId => {
            return effect.getDescriptionId() == effectId
            })) return
            let nbt = effect.save({})
        effectArray[i] = nbt
        i++
    })

    if (player.persistentData.effectstorage == undefined){player.persistentData.effectstorage = []}
    player.persistentData.effectstorage = effectArray
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.

