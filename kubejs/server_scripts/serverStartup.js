//bandaid fix for IllegalStateException that at times affects the Rhino library
ServerEvents.loaded(e => {
	e.server.runCommandSilent('gamerule naturalRegeneration true')
	//e.server.runCommandSilent('gamerule doImmediateRespawn true')
	//e.server.runCommandSilent('gamerule showDeathMessages false')
	e.server.runCommandSilent('gamerule playersSleepingPercentage 50')
	//e.server.runCommandSilent(`/modernfix upgradeStructures`)
	e.server.runCommandSilent('reload')
});

