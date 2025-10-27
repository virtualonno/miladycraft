RecipeViewerEvents.removeEntries('item', event => {

  let hiddenItems = [
    'advanced_ae:quantum_helmet'
  ]

  hiddenItems.forEach(item => {
    event.remove(item)
  })

})
