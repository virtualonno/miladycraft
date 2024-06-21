
const EntityType = Java.loadClass('net.minecraft.world.entity.EntityType');
const Result = Java.loadClass('net.minecraftforge.eventbus.api.Event$Result');


ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingSpawnEvent$CheckSpawn', event => {
	global.spawnerCleanse(event)
})

global.spawnerCleanse = event => {
    if(!event.level.server){return}
    if(event.getSpawnReason() == 'SPAWNER'){
        let spawner = event.getSpawner()
        //let data = spawner.getSpawnerBlockEntity().getUpdateTag()
        if(vanillaEntities.has(`${event.getEntity().type}`)){return}
        //spawner is an ApothSpawnerTile
        //console.log('data is:')
        //console.log(data.get('MinSpawnDelay').getAsInt())
        spawner.setEntityId(EntityType.PIG)
        event.setResult(Result.DENY)
    }
}

let vanillaEntities = new Set ([
    'minecraft:bat',
    'minecraft:bee',
    'minecraft:blaze',
    'minecraft:cave_spider',
    'minecraft:chicken',
    'minecraft:cod',
    'minecraft:cow',
    'minecraft:dolphin',
    'minecraft:drowned',
    'minecraft:enderman',
    'minecraft:endermite',
    'minecraft:glow_squid',
    'minecraft:goat',
    'minecraft:hoglin',
    'minecraft:husk',
    'minecraft:llama',
    'minecraft:magma_cube',
    'minecraft:mooshroom',
    'minecraft:phantom',
    'minecraft:pig',
    'minecraft:piglin',
    'minecraft:piglin_brute',
    'minecraft:pillager',
    'minecraft:polar_bear',
    'minecraft:pufferfish',
    'minecraft:salmon',
    'minecraft:sheep',
    'minecraft:shulker',
    'minecraft:silverfish',
    'minecraft:skeleton',
    'minecraft:slime',
    'minecraft:spider',
    'minecraft:squid',
    'minecraft:stray',
    'minecraft:strider',
    'minecraft:tadpole',
    'minecraft:tropical_fish',
    'minecraft:vex',
    'minecraft:witch',
    'minecraft:zoglin',
    'minecraft:zombie',
    'minecraft:zombified_piglin'
])


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.