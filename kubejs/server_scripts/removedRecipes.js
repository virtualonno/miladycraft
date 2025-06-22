ServerEvents.recipes( event => {
	
	let removeRecipeById = [

	]

	let removeRecipeByOutput = [
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

