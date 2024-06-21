//script to assign banned or max level enchantments, overwrites enchanted items accordingly if they surpass these limits, for Domestication Innovation pets
//const EnchantmentHelper = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper');
const Integer = Java.loadClass('java.lang.Integer');
const TamableAnimal = Java.loadClass('net.minecraft.world.entity.TamableAnimal')

let bannedEnchantmentIds = [
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
   ['domesticationinnovation:blight_curse', 0]
];

bannedEnchantmentIds = new Map(bannedEnchantmentIds)

ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityJoinLevelEvent', event => {
	global.petEnchantmentClear(event)
})

global.petEnchantmentClear = event => {
   if(event.getEntity() instanceof TamableAnimal){}
   else{return}
   let entity = event.getEntity()
   if(entity.getNbt()?.CitadelData?.StoredPetEnchantments != undefined){
      let enchantmentsNbt = entity.getNbt().CitadelData.StoredPetEnchantments
      let newEnchantmentsNbt = []
      //console.log(enchantmentsNbt);

      let flag = false
      enchantmentsNbt.forEach(enchantment =>{

         if(bannedEnchantmentIds.has(`${enchantment.id}`)){
            let maxLevel = bannedEnchantmentIds.get(`${enchantment.id}`)

            if(maxLevel === 0){
               // remove this enchantment by not adding
               flag = true;
            }
            else{
               if(parseInt(enchantment.lvl) > maxLevel){
                  // edit level to allowed max
                  enchantment.lvl = (new Integer(`${Math.floor(maxLevel)}`)).shortValue()
                  newEnchantmentsNbt.push(enchantment);
                  flag = true;
               }
               else{
                  // no level editing needed
                  newEnchantmentsNbt.push(enchantment);
               }
            }
         }
         else{
            // enchantment not in banned list
            newEnchantmentsNbt.push(enchantment);
         }
      })

      //update NBT only if there were unwanted enchantments on the collar
      if(flag){
         entity.getNbt().CitadelData.StoredPetEnchantments = newEnchantmentsNbt
      }
   }
}
