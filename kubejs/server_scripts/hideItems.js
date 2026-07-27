RecipeViewerEvents.removeEntries('item', event => {

  let hiddenItems = [
    'ae2:spatial_anchor',
		'mekanism:upgrade_anchor',
		'mekanism:dimensional_stabilizer',
  ]

  hiddenItems.forEach(item => {
    event.remove(item)
  })

})
