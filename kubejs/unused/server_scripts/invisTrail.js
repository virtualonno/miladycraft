PlayerEvents.tick(event => {
    let player = event.player;
    if (!player.hasEffect('minecraft:invisibility')) {
        return; // Skip players without invisibility
    }

    let invisTick = player.persistentData.getInt('invisTick') || 0;
    invisTick++;
    if (invisTick >= 10) {
            let randomParticles = Math.floor(Math.random() * 4) + 1;
            
            event.server.runCommandSilent(`/particle minecraft:end_rod ${player.x} ${player.y + 0.3} ${player.z} 0.25 0.1 0.25 0 ${randomParticles}`);
            invisTick = 0; // Reset counter
        }
        
    
    player.persistentData.putInt('invisTick', invisTick);
});