
let waystoneSet = new Set([
   "waystones:waystone",
   "waystones:mossy_waystone",
   "waystones:sandy_waystone"
])

let woolList = []
Ingredient.of('#minecraft:wool').stacks.forEach(item => {woolList.push(item.id)});
let spawnerUpgradeItemList = [
   'minecraft:nether_star',
   'minecraft:soul_lantern',
   'minecraft:fermented_spider_eye',
   'minecraft:ghast_tear',
   'chromaticarsenal:chroma_shard',
   'farmersrespite:coffee',
   'minecraft:prismarine_crystals',
   'minecraft:totem_of_undying',
   'minecraft:clock',
   'minecraft:diamond_block',
   'minecraft:blaze_rod'

]
spawnerUpgradeItemList = spawnerUpgradeItemList.concat(woolList) //because spread operator is not supported xd
spawnerUpgradeItemList = new Set(spawnerUpgradeItemList)

BlockEvents.rightClicked( event => {
   if (!event.entity.server) return
   if (waystoneSet.has(`${event.block.id}`)){}else{return}
   if(event.entity.hasEffect('kubejs:player_combat')){
   event.cancel();
   }
})

BlockEvents.rightClicked('minecraft:spawner', event => {
   if (!event.entity.server) return
   if (!spawnerUpgradeItemList.has(`${event.item.id}`)){return}
   event.cancel();

})

//not used because the clientside range render preview clashes with this limit
// BlockEvents.rightClicked(event =>{
//    if((event.block.id == 'alexscaves:azure_magnet') || (event.block.id == 'alexscaves:scarlet_magnet')){
//       let entity = event.level.getBlockEntity(event.block.pos)
//       console.log(event.item.id)
//       if((entity.extenderIngots >= 20) && (event.item.id == 'alexscaves:azure_neodymium_ingot') ){
//          console.log('too much azure!')
//          entity.extenderIngots = 20
//          //event.block.popItem(Item.of('alexscaves:azure_neodymium_ingot', 1))
//          event.cancel()
//       }
//       else if((entity.retracterIngots >= 20) && (event.item.id == 'alexscaves:scarlet_neodymium_ingot')  ){
//          console.log('too much scarlet!')
//          entity.retracterIngots = 20
//          //event.block.popItem(Item.of('alexscaves:scarlet_neodymium_ingot', 1))
//          event.cancel()
//       }
      
//    }
// })


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.