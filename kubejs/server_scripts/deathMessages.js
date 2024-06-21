const TamableAnimal = Java.loadClass('net.minecraft.world.entity.TamableAnimal')
let getRandomArrayElement = deathArray => deathArray[Math.floor(deathArray.length * Math.random())]

EntityEvents.death(event =>{
   let {entity, server, source} = event;
   if(((entity instanceof TamableAnimal) && (entity.getOwner() != null)) || entity.isPlayer()){
      if(source.msgId == 'bullet'){
         server.tell(`${deathMessageCompose(entity, source, bullet_list)}`)
      }
      if(source.msgId == 'outOfWorld'){
         server.tell(`${deathMessageCompose(entity, source, outOfWorld_list)}`)
      }
   }
})

function deathMessageCompose(entity, source, list){
   let output = entity.name.getString() + ' '
   output += getRandomArrayElement(list) 
   if (source.getActual() != undefined){
      output += ' by ' + source.getActual().name.getString()
   }
   return output
}

const bullet_list = [
   'was turned into holey cheese',
   'was blammed',
   'was drilled',
   'was clapped',
   'was taken down',
   'was eliminated',
   'was executed',
   'was annihilated',
   'was decimated',
   'was eviscerated',
   'was traumatized',
   'was expunged',
   'was silenced',
   'was kevorked',
   'was butchered',
   'was torpedoed',
   'was abolished',
   'was iced',
   'was slapped',
   'was wasted',
   'was smoked',
   'was pwned',
   'was body-pierced',
   'was nailed',
   'was punctured',
   'was perforated',
   'was ventilated',
   'was straw-cuttered',
   'was lead-poisoned',
   'was jumped',
   'was crushed',
   'was shell-shocked',
   'was biomassed',
   'was flatlined',
   'was liquidated',
   'was euthanized'
]

const outOfWorld_list = [
   'fell into the Void'
]


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.