ServerEvents.recipes( event => {
	
	console.log('KubeJS Miladycraft: removing recipes')
	
	let removeRecipeById = [
		'upgrade_aquatic:trident',
		'cgm:workbench',
		'moreminecarts:battery_cart',
		'moreminecarts:transport_battery',
		'immersive_armors:steampunk_helmet',
		'immersive_armors:steampunk_chestplate',
		'immersive_armors:steampunk_leggings',
		'immersive_armors:steampunk_boots',
		'band_of_gigantism:frying_pan',
		'supplementaries:slingshot',
		'farmersdelight:milk_bottle',
		'camera:camera',
		'alexsmobs:tarantula_hawk_elytra',
		'trafficcraft:wood_road_construction_tool',
		'trafficcraft:stone_road_construction_tool',
		'trafficcraft:iron_road_construction_tool',
		'trafficcraft:gold_road_construction_tool',
		'trafficcraft:diamond_road_construction_tool',
		'trafficcraft:netherite_road_construction_tool',
		'automobility:slope',
		'automobility:steep_slope',
		"byg:ametrine_helmet",
		"byg:ametrine_chestplate",
		"byg:ametrine_leggings",
		"byg:ametrine_boots",
		"byg:ametrine_horse_armor",
		"byg:pendorite_sword",
		"byg:pendorite_axe",
		"byg:pendorite_battleaxe",
		"byg:pendorite_shovel",
		"byg:pendorite_hoe",
		"byg:pendorite_horse_armor"
	]

	let removeRecipeByOutput = [
		'particlemimicry:particle_emitter',
		'quark:pickarang',
		'quark:flamerang',
		'apotheosis:iron_mining_arrow',
		'apotheosis:diamond_mining_arrow',
		'quark:spruce_ladder',
		'quark:birch_ladder',
		'quark:jungle_ladder',
		'quark:acacia_ladder',
		'quark:dark_oak_ladder',
		'quark:crimson_ladder',
		'quark:warped_ladder',
		'quark:mangrove_ladder',
		'quark:oak_chest',
		'quark:spruce_chest',
		'quark:birch_chest',
		'quark:jungle_chest',
		'quark:acacia_chest',
		'quark:dark_oak_chest',
		'quark:crimson_chest',
		'quark:warped_chest',
		'quark:mangrove_chest',
		'quark:oak_trapped_chest',
		'quark:spruce_trapped_chest',
		'quark:birch_trapped_chest',
		'quark:jungle_trapped_chest',
		'quark:acacia_trapped_chest',
		'quark:dark_oak_trapped_chest',
		'quark:crimson_trapped_chest',
		'quark:warped_trapped_chest',
		'quark:mangrove_trapped_chest',
		'quark:spruce_bookshelf',
		'quark:birch_bookshelf',
		'quark:jungle_bookshelf',
		'quark:acacia_bookshelf',
		'quark:dark_oak_bookshelf',
		'quark:crimson_bookshelf',
		'quark:warped_bookshelf',
		'quark:mangrove_bookshelf',
		"apotheosis:potion_charm",
		'trafficcraft:raw_bitumen',
		'comforts:sleeping_bag_white',
		'comforts:sleeping_bag_orange',
		'comforts:sleeping_bag_magenta',
		'comforts:sleeping_bag_light_blue',
		'comforts:sleeping_bag_yellow',
		'comforts:sleeping_bag_lime',
		'comforts:sleeping_bag_pink',
		'comforts:sleeping_bag_gray',
		'comforts:sleeping_bag_light_gray',
		'comforts:sleeping_bag_cyan',
		'comforts:sleeping_bag_purple',
		'comforts:sleeping_bag_blue',
		'comforts:sleeping_bag_brown',
		'comforts:sleeping_bag_green',
		'comforts:sleeping_bag_red',
		'comforts:sleeping_bag_black'


	]

	let removeRecipeByType = [
		'cgm:workbench',
	]

	let removeRecipeByMod = [
		'waystones',
		'casinocraft'
	]

	removeRecipeById.forEach( recipe =>{
		event.remove({id: recipe})
	})
	removeRecipeByOutput.forEach( recipe =>{
		event.remove({output: recipe})
	})
	removeRecipeByType.forEach( recipe =>{
		event.remove({type: recipe})
	})
	removeRecipeByMod.forEach( recipe =>{
		event.remove({mod: recipe})
	})


})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.