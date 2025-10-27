RecipeViewerEvents.removeEntries('item', event => {

  let hiddenItems = [
    'advanced_ae:quantum_helmet',
    'advanced_ae:quantum_chestplate',
    'advanced_ae:quantum_leggings',
    'advanced_ae:quantum_boots',
    'ae2:spatial_anchor',
		'mekanism:upgrade_anchor',
		'mekanism:dimensional_stabilizer',
  ]

  hiddenItems.forEach(item => {
    event.remove(item)
  })

})
