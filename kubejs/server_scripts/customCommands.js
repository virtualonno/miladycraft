ServerEvents.commandRegistry( event => {
   const { commands: Commands, arguments: Arguments} = event;
   const serverData = Utils.server.persistentData

      event.register(
        Commands.literal("kit")
          .requires(source => source.hasPermission(0))
          .then(Commands.argument('type', Arguments.STRING.create(event))
              .executes(ctx => {
               let arg1 = Arguments.STRING.getResult(ctx, "type")
               let player = ctx.source.player;

               if(arg1.equals("claimtools")){
                  Utils.server.runCommandSilent("/give " + player.getName().getString() + " kubejs:claim_tool 1")
                  Utils.server.runCommandSilent("/give " + player.getName().getString() + " kubejs:claim_inspector 1")
              }
               else{
                  player.tell('That isn\'t a valid kit! What are you doing!')
               }
                return 1;
              }) 
          )
      )


      // event.register(
      //    Commands.literal("kit")
      //      .requires(source => source.hasPermission(0))
      //      .then(Commands.argument('type', Arguments.STRING.create(event))
      //          .executes(ctx => {
      //           let arg1 = Arguments.STRING.getResult(ctx, "type")
      //           let player = ctx.source.player;
 
      //           if(arg1.equals("claimtools") && !serverData.kits.starter.contains(player.name)){
      //              Utils.server.runCommandSilent("/give " + player.getName().getString() + " kubejs:claim_tool 1");
      //              serverData.kits.starter.push(player.name);
      //              console.log(serverData.kits.starter)
      //              console.log(serverData.kits.starter.indexOf(player.name.getString()))
      //          }
      //           else{console.log('Binx')
      //              console.log(serverData.kits.starter)
      //           }
      //            return 1;
      //          }) 
      //      )
      //  )


   event.register(
      Commands.literal("resetpvpeffects")
      .requires(src => src.hasPermission(2))
      .then(Commands.argument('player', Arguments.PLAYER.create(event))
         .executes( ctx =>{ 
               let player = Arguments.PLAYER.getResult(ctx, 'player') 
               if(!player.isPlayer()) return 0
               for(let j = 0; j < player.persistentData.effectstorage.length; j++){
                  //const mobEffect = new $MobEffectInstance($MobEffectInstance.load());
                  player.removeEffect(player.persistentData.effectstorage[j]['forge:id'])
               }
               player.persistentData.effectstorage = []
               if(player.getTeam())
               {
                  player.server.runCommandSilent(`/team leave ${player.name.getString()}`)
               }
               return 1

         })
      )

   )


   event.register(
      Commands.literal("setprincess")
      .requires(src => src.hasPermission(2))
      .then(Commands.argument('player', Arguments.PLAYER.create(event))
         .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
            .executes (ctx => {
               let player = Arguments.PLAYER.getResult(ctx, 'player') 
               let bool = Arguments.BOOLEAN.getResult(ctx, 'bool')
               //if (player.persistentData.princess == undefined){event.player.persistentData.princess = 0}
               if(bool){
                  player.persistentData.princess = 1
                  console.log(`Set princess value to: ${player.persistentData.princess}. ${player.name.getString()} is now a princess!`)
                  player.potionEffects.add('kubejs:princess', 600000, 0, true, false)
               }
               else if(!bool){
                  player.persistentData.princess = 0
                  console.log(`Set princess value to: ${player.persistentData.princess}. ${player.name.getString()} is now no longer a princess.`)
                  //to clear existing princess effect, we can simply use this command, as princess effect gets recorded into effectstorage
                  player.server.runCommandSilent(`/resetpvpeffects ${player.name.getString()}`)
               }
               else{console.log('Invalid princess operation.')}
               return 1
            })
         )
      )
   )
        
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.