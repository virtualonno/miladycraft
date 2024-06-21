const $MobEffectInstance = Java.loadClass(`net.minecraft.world.effect.MobEffectInstance`);

//minor optimization due to how effects are called; instead of 'kubejs:flagged'
let immuneEffects = [
    'effect.kubejs.flagged',
    'effect.kubejs.deserter',
    'effect.kubejs.princess',
    'effect.kubejs.player_combat',
    'effect.kubejs.ominous_presence',
    'effect.kubejs.homebound',
    'effect.kubejs.sanctuary'
]

let immuneEffectIds = [
    'kubejs:flagged',
    'kubejs:deserter',
    'kubejs:princess',
    'kubejs:player_combat',
    'kubejs:ominous_presence',
    'kubejs:homebound',
    'kubejs:sanctuary'
]

let removalTick = 0
PlayerEvents.tick( event => {
    removalTick++
    if (removalTick % 20 == 0){
        if (event.player.persistentData.effectstorage == undefined){event.player.persistentData.effectstorage = []}
        if (event.player.persistentData.effectstorage.length){
            for(let j = 0; j < event.player.persistentData.effectstorage.length; j++){
                let nbt = event.player.persistentData.effectstorage[j]
                if (!immuneEffectIds.some(effectId => {
                    return nbt["forge:id"] == effectId
                    })) continue
                if ((!event.player.hasEffect(nbt["forge:id"])) && (nbt.Duration >= 30)){
                    event.player.addEffect($MobEffectInstance.load(event.player.persistentData.effectstorage[j]), event.player)
                }
            }
        }
        let effectArray = []
        let i = 0 
        event.player.activeEffects.forEach(effect => {
            if (!immuneEffects.some(effectId => {
                return effect.getDescriptionId() == effectId
                })) return
                let nbt = effect.save({})
            effectArray[i] = nbt
            i++
        })
        event.player.persistentData.effectstorage = effectArray
        removalTick = 0
    }
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.