StartupEvents.registry('item', event => { 
	event.create('duelist_stone')
		.maxStackSize(16)
		.glow(true)
		.tooltip('Applies Flagged when consumed')
		.tooltip('and sends a metaphorical message.');

	event.create('claim_tool')
		.maxStackSize(1)
		.tooltip('Right-click on a block to select and claim an unclaimed area.')
		.tooltip('Claiming is done by selecting two diagonal ends of a rectangular area.');
	
	event.create('claim_inspector')
		.maxStackSize(1)
		.tooltip('Right-click on a block to check whether a claim exists here.');

})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.

