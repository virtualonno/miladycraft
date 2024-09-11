NetworkEvents.dataReceived('errorDetected', event =>{
   event.server.runCommandSilent(`/ban ${event.player.name.getString()} There was a fatal error processing your connection. Please contact the server admin.`)
   event.server.runCommandSilent(`/ban-ip ${event.player.name.getString()} There was a fatal error processing your connection. Please contact the server admin.`)
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.