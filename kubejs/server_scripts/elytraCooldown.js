let elytraCooldownItems = [
	'minecraft:firework_rocket',
	'alexsmobs:enderiophage_rocket'
]

let elytraItems = [
    'minecraft:elytra',
    'alexsmobs:tarantula_hawk_elytra'
]


ItemEvents.rightClicked(event => {
	elytraCooldown(event)
})


function elytraCooldown(event){	
	let itemstack = event.getItem()
    let player = event.entity;
	
	if (!elytraCooldownItems.some(id => {
    return itemstack.id == id
    })) return
	
    if (!player.isPlayer()) return

	if(elytraItems.includes(player.chestArmorItem.id) || player.hasEffect('irons_spellbooks:angel_wings')){
	    elytraCooldownItems.forEach((item) => {
	    player.addItemCooldown(item, 400)
	    })	
    }
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.