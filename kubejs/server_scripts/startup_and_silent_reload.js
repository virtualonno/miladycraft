//bandaid fix for IllegalStateException that at times affects the Rhino library
ServerEvents.loaded(e => {
	e.server.runCommandSilent('gamerule naturalRegeneration true')
	//e.server.runCommandSilent('gamerule doImmediateRespawn true')
	//e.server.runCommandSilent('gamerule showDeathMessages false')
	e.server.runCommandSilent('gamerule playersSleepingPercentage 35')
	//e.server.runCommandSilent(`/modernfix upgradeStructures`)
	e.server.runCommandSilent('reload')
});


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.