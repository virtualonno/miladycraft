// This script attempts to mechanically intricate vanilla invisibility by having it wear off in water
// Alternatively, for persistent invisibility curios, it instead reveals the user

let $CuriosCapability = Java.loadClass('top.theillusivec4.curios.api.CuriosCapability')

let persistentInvisItems = [
    'artifacts:scarf_of_invisibility',
    'apotheosis:potion_charm[potion_contents={potion:"minecraft:invisibility"}]',
    'apotheosis:potion_charm[potion_contents={potion:"minecraft:long_invisibility"}]'
]

PlayerEvents.tick(event => {
    //check once per second
    if (event.level.time % 20 !== 0) return;
    //player not in water
    let player = event.player;
    if (!player.isInWater()) {
        return; 
    }
    //player doesnt have invis
    if (!player.hasEffect('minecraft:invisibility')) {
        return;
    }
    //in water and invis: strip invis
    player.removeEffect('minecraft:invisibility')


    let curiosInventory = player.getCapability($CuriosCapability.INVENTORY)
    if(persistentInvisItems.some(item => curiosInventory.isEquipped(item))){
        player.potionEffects.add('minecraft:glowing',  200, 0, false, true)
    }

})