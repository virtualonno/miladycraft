
// script that prevents explosions from breaking blocks
// intended for the official Miladycraft server

NativeEvents.onEvent('net.neoforged.neoforge.event.level.ExplosionEvent$Detonate', event => {
    let affectedBlocks = event.getAffectedBlocks()
    affectedBlocks.clear()
})