//When a cooldown is fired for the Potion Slingshot when shooting a potion, the client crashes;

// let bannedItems = [
// 	//'alchemygadgetry:potion_slingshot',
// 	'supplementaries:slingshot',
// 	'camera:camera',
// 	'trafficcraft:wood_road_construction_tool'
// ]

// bannedItems = new Set(bannedItems)

// ItemEvents.rightClicked(event => {
// 	removeItem(event)
// })

// function removeItem(event) {	
// 	let itemstack = event.getItem()
//     let player = event.entity
// 	if (!player.isPlayer()) return
	
// 	if(bannedItems.has(`${itemstack.getId()}`)){
// 		itemstack.count -= 1
// 		event.cancel()
// 	}
	
// }


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.