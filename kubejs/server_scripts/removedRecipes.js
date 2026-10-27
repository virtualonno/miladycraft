ServerEvents.recipes( event => {
	
	// Dramatic Doors injects tall versions of Chipped doors whose Chipped
	// ingredients our Chipped build does not have; they cannot parse.
	let removeRecipeById = [
		'modern_acacia', 'modern_birch', 'modern_crimson', 'modern_dark_oak',
		'modern_jungle', 'modern_mangrove', 'modern_spruce', 'modern_warped',
		'screen_mangrove', 'shack_mangrove', 'sliding_warped', 'tiled_mangrove',
	].map(door => `dramaticdoors:tall_chipped_${door}_door`)

	let removeRecipeByOutput = [
		'ae2:spatial_anchor',
		'mekanism:upgrade_anchor',
		'mekanism:dimensional_stabilizer',
	]

	let removeRecipeByType = [
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
})

