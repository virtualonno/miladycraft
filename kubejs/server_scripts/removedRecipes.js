ServerEvents.recipes( event => {
	
	let removeRecipeById = [

	]

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

