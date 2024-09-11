ServerEvents.command( event => {

   let commandList = [
      'spawn',
      'flan'
   ]

   let effectList = [
      //'kubejs:flagged',
      'kubejs:player_combat'
   ]

   let command = event.getCommandName()

   if (!commandList.some(list => {
      return command == list
      })) return

   let player = event.getParseResults().getContext().getSource().getEntity()
   if (!player.isPlayer()) return

   if (!effectList.some(list => {
      return player.hasEffect(list)
      })) return

    event.cancel();
   
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.