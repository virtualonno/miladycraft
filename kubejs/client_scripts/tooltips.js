ItemEvents.tooltip(event => {

	console.log('Firing Miladycraft custom tooltip event')
	
	event.addAdvanced('cgm:basic_bullet', (item, advanced, text) => {
		text.add(1, Text.of('Partially ignores armor on Players').gray())		
	})
	event.addAdvanced('cgm:advanced_bullet', (item, advanced, text) => {
		text.add(1, Text.of('Partially ignores armor on Players').gray())		
	})
	event.addAdvanced('cgm:shell', (item, advanced, text) => {
		text.add(1, Text.of('Partially ignores armor on Players').gray())		
	})
	
	event.addAdvanced('minecraft:netherite_hoe', (item, advanced, text) => {
		text.add(1, Text.of('Able to mine Spawners').gray())		
	})		

	event.addAdvanced('byg:pendorite_hoe', (item, advanced, text) => {
		text.add(1, Text.of('Able to mine Spawners').gray())		
	})
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.