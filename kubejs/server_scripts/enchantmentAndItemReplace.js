//script to assign banned or max level enchantments, overwrites enchanted items accordingly if they surpass these limits
const EnchantmentHelper = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper')
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
const Integer = Java.loadClass('java.lang.Integer')

let bannedEnchantmentIds = new Map([
   ['minecraft:mending', 0],
   ['apotheosis:life_mending', 0],

   ['minecraft:protection', 6],
   ['minecraft:fire_protection', 6],
   ['minecraft:feather_falling', 6],
   ['minecraft:blast_protection', 6],
   ['minecraft:projectile_protection', 6],
   ['minecraft:respiration', 6],
   ['minecraft:thorns', 5],
   ['minecraft:depth_strider', 5],
   ['minecraft:frost_walker', 3],
   ['minecraft:soul_speed', 5],
   ['minecraft:swift_sneak', 5],
   ['minecraft:sharpness', 6],
   ['minecraft:smite', 5],
   ['minecraft:bane_of_arthropods', 5],
   ['minecraft:knockback', 4],
   ['minecraft:fire_aspect', 2],
   ['minecraft:looting', 4],
   ['minecraft:sweeping', 4],
   ['minecraft:efficiency', 6],
   ['minecraft:unbreaking', 8],
   ['minecraft:fortune', 4],
   ['minecraft:power', 6],
   ['minecraft:punch', 4],
   ['minecraft:luck_of_the_sea', 5],
   ['minecraft:lure', 5],
   ['minecraft:loyalty', 5],
   ['minecraft:impaling', 6],
   ['minecraft:riptide', 5],
   ['minecraft:quick_charge', 3],
   ['minecraft:piercing', 5],

   ['apotheosis:miners_fervor', 3],
   ['apotheosis:icy_thorns', 0],
   ['apotheosis:shield_bash', 0],
   ['apotheosis:reflective', 0],
   ['apotheosis:natures_blessing', 3],
   ['apotheosis:rebounding', 0],
   ['apotheosis:bane_of_illagers', 5],
   ['apotheosis:crescendo', 2],
   ['apotheosis:endless_quiver', 0],
   ['apotheosis:earths_boon', 0],
   ['apotheosis:spearfishing', 5],
   ['apotheosis:capturing', 5],
   ['apotheosis:tempting', 0],

   ['alexsmobs:straddle_jump', 3],


   ['domesticationinnovation:health_boost', 3],
   ['domesticationinnovation:immunity_frame', 0],
   ['domesticationinnovation:shadow_hands', 0],
   ['domesticationinnovation:deflection', 0],
   ['domesticationinnovation:chain_lightning', 0],
   ['domesticationinnovation:speedster', 2],
   ['domesticationinnovation:frost_fang', 0],
   ['domesticationinnovation:magnetic', 0],
   ['domesticationinnovation:linked_inventory', 0],
   ['domesticationinnovation:bubbling', 0],
   ['domesticationinnovation:herding', 0],
   ['domesticationinnovation:vampire', 2],
   ['domesticationinnovation:charisma', 0],
   ['domesticationinnovation:shadow_hands', 0],
   ['domesticationinnovation:defusal', 3],
   ['domesticationinnovation:warping_bite', 0],
   ['domesticationinnovation:ore_scenting', 0],
   ['domesticationinnovation:psychic_wall', 3],
   ['domesticationinnovation:intimidation', 0],
   ['domesticationinnovation:blazing_protection', 3],
   ['domesticationinnovation:healing_aura', 2],
   ['domesticationinnovation:infamy_curse', 0],
   ['domesticationinnovation:blight_curse', 0],

   ['farmersdelight:backstabbing', 5],

   ['backpacked:funnelling', 0],
   ['backpacked:repairman', 0],
   ['backpacked:looted', 0],
   ['backpacked:imbued_hide', 0],
   ['backpacked:marksman', 0],

   ['allurement:launch', 2],
   ['allurement:reeling', 2],
   ['allurement:shockwave', 0],
   ['allurement:spread_of_ailments', 3],
   ['allurement:vengeance', 3],

   ['supplementaries:stasis', 0],
   
   ['cgm:quick_hands', 0],
   ['cgm:trigger_finger', 0],
   ['cgm:lightweight', 0],
   ['cgm:collateral', 0],
   ['cgm:over_capacity', 0],
   ['cgm:reclaimed', 0],
   ['cgm:accelerator', 0],
   ['cgm:puncturing', 0],
   ['cgm:fire_starter', 0]

])

let replacedItemIds = new Map([
   ["delightful:pendorite_knife", "farmersdelight:netherite_knife"],
   ["byg:pendorite_sword", "minecraft:netherite_sword"],
   ["byg:pendorite_axe", "minecraft:netherite_axe"],
   ["byg:pendorite_pickaxe", "minecraft:netherite_pickaxe"],
   ["byg:pendorite_battleaxe", "minecraft:netherite_axe"],
   ["byg:pendorite_shovel", "minecraft:netherite_shovel"],
   ["byg:pendorite_hoe", "minecraft:netherite_hoe"],
   ["byg:ametrine_helmet", "minecraft:netherite_helmet"],
   ["byg:ametrine_chestplate", "minecraft:netherite_chestplate"],
   ["byg:ametrine_leggings", "minecraft:netherite_leggings"],
   ["byg:ametrine_boots", "minecraft:netherite_boots"],
   
   ["alexsmobs:tarantula_hawk_elytra", "minecraft:elytra"],

   ["byg:pendorite_horse_armor", "minecraft:air"],
   ["byg:ametrine_horse_armor", "minecraft:air"],

   ["apotheosis:potion_charm", "minecraft:air"],

   ["supplementaries:slingshot", "minecraft:air"],
   ["camera:camera", "minecraft:air"],
   ["apotheosis:diamond_mining_arrow", "minecraft:air"],
   ["apotheosis:iron_mining_arrow", "minecraft:air"],
   ["apotheosis:explosive_arrow", "minecraft:air"],

   //["additionalguns:zerkalo_scope", "nzgmaddon:dot_sight"],
   ["trafficcraft:wood_road_construction_tool", "minecraft:air"],
   ["trafficcraft:stone_road_construction_tool", "minecraft:air"],
   ["trafficcraft:iron_road_construction_tool", "minecraft:air"],
   ["trafficcraft:gold_road_construction_tool", "minecraft:air"],
   ["trafficcraft:diamond_road_construction_tool", "minecraft:air"],
   ["trafficcraft:netherite_road_construction_tool", "minecraft:air"]
])

// const validTool = item.tags.toList().some((tag) => {
//    return tag.toString().includes("cave_collapse:mining_tools")
// })


PlayerEvents.loggedIn(event =>{
  updateEnchantments(event)
})


PlayerEvents.inventoryClosed(event =>{
   updateEnchantments(event)
 })



function updateEnchantments(event){
   let inventory = event.player.inventory

   for (let i = 0; i < inventory.getContainerSize(); i++){ 
      let item = inventory.getItem(i)

      if(replacedItemIds.has(`${item.getId()}`)){
         //console.log(`hi`)
         let newItem = new ItemStack(ForgeRegistries.ITEMS.getValue(new ResourceLocation(replacedItemIds.get(`${item.getId()}`))), item.getCount());
         //console.log(newItem)


         // Copy the NBT data from the old item stack to the new one
         if(newItem.getId() == "minecraft:elytra"){
            let oldNbt = item.getNbt()
            //console.log(oldNbt)
            if(oldNbt.Enchantments != undefined){
               oldNbt.Enchantments = {}
            }
            newItem.setNbt(oldNbt)
         }


         if(newItem.getId() != "minecraft:air"){
            let oldNbt = item.getNbt()
            if(oldNbt != undefined){
               newItem.setNbt(oldNbt.copy())
            }
         }

         

         // Replace the old item stack with the new one
         inventory.setStackInSlot(i, newItem);
     }
      

      let enchantments = EnchantmentHelper.getEnchantments(item);

      //skip if no enchantments present
      if(enchantments.isEmpty()){continue}

      //check for unwanted enchantments
      let flag = false;
      for(let entry of enchantments.entrySet()){
         //onsole.log(entry.getKey().getId())
         if(
         bannedEnchantmentIds.has(`${entry.getKey().getId()}`) 
         && 
         parseInt(bannedEnchantmentIds.get(`${entry.getKey().getId()}`)) < parseInt(entry.getValue()) 
         ){
            //console.log('uh oh!')
            flag = true;
         } 
         else {
            continue
         }
      }
      //continue to next item if no unwanted enchantment has been detected, preventing trawling through slow NBT
      if(!flag){continue}
      let enchantmentsNbt = undefined;
      if(item.getId() == "minecraft:enchanted_book"){
         enchantmentsNbt = item.getNbt().StoredEnchantments;
      }
      else{
         enchantmentsNbt = item.getNbt().Enchantments;
      }
      let newEnchantmentsNbt = [];

      if(enchantmentsNbt.isEmpty() || enchantmentsNbt == undefined){continue}
      enchantmentsNbt.forEach(enchantment =>{

         if(bannedEnchantmentIds.has(`${enchantment.id}`)){
            let maxLevel = bannedEnchantmentIds.get(`${enchantment.id}`)

            if(maxLevel === 0){
               // remove this enchantment by not adding
            }
            else{
               if(parseInt(enchantment.lvl) > maxLevel){
                  // edit level to allowed max
                  enchantment.lvl = (new Integer(`${Math.floor(maxLevel)}`)).shortValue()
                  newEnchantmentsNbt.push(enchantment)
               }
               else{
                  // no level editing needed
                  newEnchantmentsNbt.push(enchantment)
               }
            }
         }
         else{
            // enchantment not in banned list
            newEnchantmentsNbt.push(enchantment)
         }
      })

      // push amended enchantments to item
      if(item.getId() == "minecraft:enchanted_book"){
         item.getNbt().StoredEnchantments = newEnchantmentsNbt
      }
      else{
         item.getNbt().Enchantments = newEnchantmentsNbt
      }
    }
}


