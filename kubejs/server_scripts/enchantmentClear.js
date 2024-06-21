//script to assign banned or max level enchantments, overwrites enchanted items accordingly if they surpass these limits
const EnchantmentHelper = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper');
const Integer = Java.loadClass('java.lang.Integer');

let bannedEnchantmentIds = [
   ['minecraft:mending', 0],
   ['potheosis:life_mending', 0],
   ['minecraft:sharpness', 3]
];

// let bannedEnchantmentIds = [
//    ['enchantment.minecraft.mending', '0'],
//    ['enchantment.apotheosis.life_mending', '0'],
//    ['enchantment.minecraft.sharpness', '3']
// ];

bannedEnchantmentIds = new Map(bannedEnchantmentIds);

// const validTool = item.tags.toList().some((tag) => {
//    return tag.toString().includes("cave_collapse:mining_tools")
// })


PlayerEvents.loggedIn(event =>{
  updateEnchantments(event);
})


PlayerEvents.inventoryClosed(event =>{
   updateEnchantments(event);
 });



function updateEnchantments(event){
   //console.log(`hi`)
   let player = event.player;

   let itemList = player.inventory.getAllItems();
   for(let item in itemList){
      item = itemList[item];
      //console.log(item.getNbt()?.Enchantments)
      //let enchantments = item.getNbt().Enchantments;
      let enchantments = EnchantmentHelper.getEnchantments(item);
      //console.log(enchantments);
      if(enchantments.isEmpty()){continue;}
      //console.log(`brr`)
      let enchantmentsNbt = item.getNbt().Enchantments;
      enchantments.forEach(enchantment =>{
         //console.log(enchantment.id)
         //console.log(enchantment.getDescriptionId());
         if(bannedEnchantmentIds.has(`${enchantment.id}`)){
            let maxLevel = bannedEnchantmentIds.get(`${enchantment.id}`);

            //console.log(maxLevel)
            if(maxLevel === 0){
               for(let entry in enchantmentsNbt){
                  if(enchantmentsNbt[entry].id === enchantment.id){
                     delete enchantmentsNbt[entry];
                  };
               }
            }
            else{
               for(let entry in enchantmentsNbt){
                  if(enchantmentsNbt[entry].id === enchantment.id){
                     if(parseInt(enchantmentsNbt[entry].lvl) > maxLevel){
                        //console.log(`meow`)
                        enchantmentsNbt[entry].lvl = (new Integer(`${Math.floor(maxLevel)}`)).shortValue();
                     };
                  };
               }
            };
         };
      })
    }
};


