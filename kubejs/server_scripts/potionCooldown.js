//When a cooldown is fired for the Potion Slingshot when shooting a potion, the client crashes;

let potionCooldownItems = [
	//'minecraft:splash_potion',
    //'minecraft:lingering_potion',	
	'cgm:stun_grenade',
	'cgm:grenade'
]


PlayerEvents.loggedIn(event => {

    let player = event.entity;
	potionCooldownItems.forEach((item) => {
	player.addItemCooldown(item, 60)
	})
})

ItemEvents.rightClicked(event => {
	potionCooldown(event)
})


function potionCooldown(event){	
	let itemstack = event.getItem()
    let player = event.entity;
	
	if (!potionCooldownItems.some(id => {
    return itemstack.id == id
    })) return
	
    if (!player.isPlayer()) return
	
	potionCooldownItems.forEach((item) => {
	player.addItemCooldown(item, 200)
	})	
}


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.