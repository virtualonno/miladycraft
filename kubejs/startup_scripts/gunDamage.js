//const $EntityDamageSource = Java.loadClass(`net.minecraft.world.damagesource.EntityDamageSource`);

//LivingHurtEvent is before final damage calculation, LivingDamageEvent after calculation and right before damage applied
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
	global.projectileDamage(event)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', event => {
	global.mitigateArmor(event)
})

//gets initial damage from which the reducedMultiplier is calculated
global.projectileDamage = event => {
    if ((!event.source.isProjectile())){return}
    let attacker = event.source.actual
       if (attacker.isPlayer()){
         if(attacker.hasEffect('kubejs:ominous_presence')){event.setAmount(event.getAmount()*0.5)}
         if ((event.source.immediate.type != 'cgm:projectile')){return}
         // only ignores armor against other players
         //if (!event.entity.isPlayer()){return}
         if (attacker.persistentData.projectileDamage == undefined){attacker.persistentData.projectileDamage = 0}
         attacker.persistentData.projectileDamage = global.reductionMultiplier(event.getAmount(), event.entity.getArmorValue())
            //global.reducedMultiplier = global.reductionMultiplier(event.getAmount(), event.entity.getArmorValue())
      }
   }

// uses reducedMultiplier AFTER armor-reduced damage from initial damage has been calculated
// this so that the multiplier is not erroneously applied at initial damage before armor reduction
// because armor reduction per Apotheosis is a split formula
global.mitigateArmor = event => {
   if (!event.source.isProjectile()){return}
   if (event.source.immediate.type != 'cgm:projectile'){return}
   // only ignores armor against other players
   if (!event.entity.isPlayer()){return}
   let attacker = event.source.actual
   if (attacker.isPlayer()){
      event.setAmount(event.getAmount() * attacker.persistentData.projectileDamage)
      //console.log(event.source.immediate.type)
   }
}

//multiplier of armor damage reduction that should be ignored
// uses apotheosis its damage reduction multiplier formula inverted
global.reductionMultiplier = (damage, armor) => {
   let reduction = 0.75
   let a = 0
  if (damage < 20){
      a = 10
   }
   else{a = (10 + ((damage - 20) / 2))}
   let reduced = ((a + (armor * reduction)) /a)
   //console.log(reduced)
   return reduced
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.