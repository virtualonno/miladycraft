ServerEvents.recipes( event => {
	
	let removeRecipeById = [

	]

	let removeRecipeByOutput = [
		'advanced_ae:quantum_helmet',
		'advanced_ae:quantum_chestplate',
		'advanced_ae:quantum_leggings',
		'advanced_ae:quantum_boots',
		'ae2:spatial_anchor',
		'mekanism:upgrade_anchor',
		'mekanism:dimensional_stabilizer',
	]

	let removeRecipeByType = [
	]

	let removeRecipeByMod = [
		'waterframes'
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

