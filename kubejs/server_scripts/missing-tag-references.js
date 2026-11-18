// Tag members that mods ship for content this pack does not have: Quark
// furniture in Kaleidoscope Cookery's lists and Drink It's sample items.
// Removing them keeps the rest of each tag loading.

const quarkFurniture = ['ancient', 'azalea', 'blossom'].flatMap(wood =>
  ['chair', 'cook_stool', 'table'].map(piece => `kaleidoscope_cookery:kalc/quark/${piece}_${wood}`))

ServerEvents.tags('block', event => {
  event.remove('carryon:block_blacklist', quarkFurniture)
})

ServerEvents.tags('item', event => {
  event.remove('kaleidoscope_cookery:cookery_mod_items', quarkFurniture)
  event.remove('drinkit:drinkable', 'example:another_example')
  event.remove('drinkit:noeatingsound', 'example:just_another_example')
})
