const $StructurePieceSerializationContext = Java.loadClass("net.minecraft.world.level.levelgen.structure.pieces.StructurePieceSerializationContext")
const $ChunkPos = Java.loadClass('net.minecraft.world.level.ChunkPos')

const structures_giving_effect = ["minecraft:mineshaft"] // list of structures, giving effect, use "INVALID" for giving effect in no structure
const effect_id = "minecraft:mining_fatigue" // effect id
const effect_seconds = 20 // effect duration in seconds
const effect_amplifier = 3 // level of effect


function get_structures_player_in(player) {
    let structures_list = []
    let structure_manager = player.level.structureManager()
    let block_pos = player.blockPosition()
    let chunk_pos = new $ChunkPos(block_pos)
    let structures = structure_manager.getAllStructuresAt(block_pos) // getting list of all structures in players chunk
    let serialization = $StructurePieceSerializationContext.fromLevel(player.level)

    structures.forEach((structure, long_set) => {
        let structure_start = structure_manager.getStructureAt(block_pos, structure)
        let structure_id = structure_start.createTag(serialization, chunk_pos).get('id').toString().replace('"', '')
        structures_list.push(structure_id)
    })
    return structures_list
}


let tick_count_structures = 0
ServerEvents.tick(event => {
    tick_count_structures++
    if (tick_count_structures % 20 == 0) { // every 20 tick, because we don't want to ruin performance
        event.server.players.forEach(player => { // iterate by every player on server
            if (player.isSpectator()) {
                return; // next loop iteration
            }
            let structures = get_structures_player_in(player)
            structures.forEach(structure => {
                if (!structures_giving_effect.includes(structure)) {
                    return; // next loop iteration
                }
                event.server.runCommandSilent(`/effect give ${player.uuid} ${effect_id} ${effect_seconds} ${effect_amplifier}`)
                // other actions we need
            })
        })
    }
})


// modified from KostromDan's example on KubeJS Discord

// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.