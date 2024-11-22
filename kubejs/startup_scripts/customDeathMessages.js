// Class imports
let TamableAnimal = Java.loadClass('net.minecraft.world.entity.TamableAnimal')
let LivingDeathEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingDeathEvent')
let Component = Java.loadClass('net.minecraft.network.chat.Component')
let Player = Java.loadClass('net.minecraft.world.entity.player.Player')
let TranslatableContents = Java.loadClass('net.minecraft.network.chat.contents.TranslatableContents')
let Style = Java.loadClass('net.minecraft.network.chat.Style')
let ChatFormatting = Java.loadClass('net.minecraft.ChatFormatting')


let deathTypes = {
    "death.attack.tacz.bullet": 28,
    "death.attack.thrown": 28,
    "death.attack.supplementaries.bamboo_spikes": 1,
    "death.attack.mob": 2,
    "death.attack.arrow": 1,
    "death.attack.outOfWorld": 1,
    "death.attack.outOfWorld.player": 1,


    "death.pet.named": 3,
    "death.item": 2,
    "death.indirectkiller": 3,
    "death.killer": {
        entries: 2,
        weights: {
            1: 5
        }
    }
    // outOfWorld: {
    //     direct: ['fell into the Void'],
    //     indirect: ['fell into the Void while running from %k']
    // },
    // fall: {
    //     direct: ['hit the ground too hard', 'fell from a high place'],
    //     indirect: ['hit the ground too hard while escaping %k', 'fell from a high place trying to escape %k']
    // },
    // onFire: {
    //     direct: ['burned to death', 'turned to ash', 'became too spicy', 'spontaneously combusted'],
    //     indirect: ['burned to death while fighting %k', 'turned to ash while dueling %k', 'became too spicy thanks to %k']
    // },
    // inFire: {
    //     direct: ['burned to death', 'turned to ash', 'became too spicy', 'spontaneously combusted'],
    //     indirect: ['burned to death while fighting %k', 'turned to ash while dueling %k', 'became too spicy thanks to %k']
    // },
    // explosion: {
    //     direct: ['went boom', 'was instagibbed', 'was blown to bits', 'became confetti', 'was biomassed'],
    //     indirect: ['was blown up while fighting %k']
    // },
    // drowning: {
    //     direct: ['forgot to breathe', 'became fish food', 'took a long dive', 'was sent to Davy Jones\' locker'],
    //     indirect: ['drowned while trying to escape %k']
    // },
    // 'supplementaries.bamboo_spikes': {
    //     direct: ['was impaled on a spike'],
    //     indirect: ['was impaled on a spike whilst fighting %k']
    // },
    // 'death.fell.accident.generic': [
    //     'hit the ground too hard',
    //     'fell from a high place'
    // ],
    // 'death.attack.supplementaries.bamboo_spikes':[
    //     'miladycraft.death.attack.supplementaries.bamboo_spikes.impaled'
    // ],
    // 'death.attack.supplementaries.bamboo_spikes.player':[
    //     'was impaled on a spike whilst fighting %k'
    // ],
    // 'death.attack.mob':[
    //     'was btfod by %k'
    // ]
}

let exceptionDeathTypes = new Set([
    "death.attack.player",
    "death.attack.outOfWorld.player"
])

let deathMessages = {}
for (let [type, config] of Object.entries(deathTypes)) {
    let entries
    let weights = {}
    
    // Handle both simple number and complex config cases
    if (typeof config === 'number') {
        entries = config
    } else {
        entries = config.entries
        weights = config.weights || {}
    }
    
    deathMessages[type] = []
    for (let i = 1; i <= entries; i++) {
        deathMessages[type].push({
            message: `miladycraft.${type}.${i}`,
            weight: weights[i] || 1  // Default weight is 1 if not specified
        })
    }
}


const DeathMessageHandler = {
    getEntityName(entity) {
        return entity.getName().getString()
    },

    getEntityType(entity) {
        return 'entity.' + entity.type.replace(':', '.')
    },

    isPet(entity) {
        if(entity instanceof TamableAnimal){
            return entity.getOwner() != null 
        }
        else{
            return false
        }
    },

    getPetOwnerName(pet) {
        try {
            let owner = pet.getOwner()
            return owner ? owner.name : null
        } catch (e) {
            console.error('Error getting pet owner: ' + e)
            return null
        }
    },

    formatPetName(entity) {
        let ownerName = this.getPetOwnerName(entity)
        if (!ownerName) return this.getEntityName(entity)

        let entityName = this.getEntityName(entity)
        let entityType = Component.translatable(this.getEntityType(entity))
        
        if (entity.hasCustomName()) {
            return Component.translatable(this.getRandomMessage("death.pet.named"),
                ownerName,
                entityType,
                entityName
            )
        }
        return Component.translatable('miladycraft.death.pet.unnamed', 
            ownerName,
            entityType
        )
    },

    getRandomMessage(category) {
        let messageList = deathMessages[category]
        if (!messageList || messageList.length === 0) return null

        // Calculate total weight
        let totalWeight = messageList.reduce((sum, entry) => sum + entry.weight, 0)
        
        // Generate random number between 0 and total weight
        let random = Math.random() * totalWeight
        
        // Find the selected message based on weights
        let currentWeight = 0
        for (let entry of messageList) {
            currentWeight += entry.weight
            if (random <= currentWeight) {
                return entry.message
            }
        }
        
        // Fallback to first message if something goes wrong
        return messageList[0].message
    },


    shouldHandleEntity(entity) {
        return entity.isPlayer() || this.isPet(entity)
    },

    composeDeathMessage(source, entity, combatTracker) {
        let victimEntity = this.isPet(entity) ? 
            this.formatPetName(entity) : 
            this.getEntityName(entity)

        let deathMessage = combatTracker.getDeathMessage()
        
        //console.log(deathMessage)

        let vanillaContents = this.parseTranslatableContents(deathMessage)

        //console.log(vanillaContents)

        let deathMessageKey = vanillaContents.key
        console.log(`Death type recorded: ${deathMessageKey}`)

        //account for exceptions
        let exceptionType = false

        let hasWeapon = deathMessageKey.endsWith('.item')
        let hasIndirectKiller = deathMessageKey.endsWith('.player')
        if (deathMessageKey.endsWith('.player.item')){
            hasWeapon = true
            hasIndirectKiller = true
        }
        if(!exceptionDeathTypes.has(`${deathMessageKey}`)){
            // Strip .item suffix if present
            if (hasWeapon) {
                deathMessageKey = deathMessageKey.slice(0, -5)
            }

            // Strip .player suffix if present, always comes before .item so no problems here
            // No need to do anything with this later, deaths with indirect killers are handled by killerMessage
            if (hasIndirectKiller) {
                deathMessageKey = deathMessageKey.slice(0, -7)
            }
        }
        else{
            exceptionType = true
        }


        //console.log(`Death message key is: ${deathMessageKey}`)
        let killerEntity = null
        if(source){
             killerEntity = Component.translatable(this.getEntityType(source))
            // Since players are handled differently in deathMessage
            if (source.isPlayer()){
                killerEntity = source.name
            }
            else if(source.hasCustomName()){
                killerEntity
                .append(' \'')
                .append(source.name)
                .append('\'')
            }
        }
        // Correct formatting for indirect killers with additional formatting if they're named, or players
        else if(hasIndirectKiller){
            let indirectKiller = entity.getLevel().getEntity(deathMessage.getContents().getArgs()[1].getStyle().getInsertion())

            // in case of player, because insertion is player name instead of uuid
            if(!indirectKiller){
                killerEntity = deathMessage.getContents().getArgs()[1].getStyle().getInsertion()
                // in case of non-player entity that has died, meaning the UUID does not return anything; discard
                if(killerEntity.length() == 36){
                    killerEntity = null
                }
            }
            else{
                killerEntity = Component.translatable(this.getEntityType(indirectKiller))
                
                if(indirectKiller.hasCustomName()){
                    killerEntity
                    .append(' \'')
                    .append(indirectKiller.name)
                    .append('\'')
                }
            }
        }
        
    

        let killerMessage = null
        if(exceptionType){}
        else if(killerEntity){
            if(hasIndirectKiller){
                killerMessage = Component.translatable(this.getRandomMessage("death.indirectkiller"), killerEntity)
            }
            else{
                killerMessage = Component.translatable(this.getRandomMessage("death.killer"), killerEntity)
            }
        }

        //console.log(`Killer entity is: ${killerEntity}`)


        if(!deathMessages.hasOwnProperty(deathMessageKey)) return null

        let messageKey = this.getRandomMessage(deathMessageKey)
        if (!messageKey) return null

        // Create base death message
        let customDeathMessage = null
        if(exceptionType){
            customDeathMessage = !killerEntity ?
            Component.translatable(messageKey, victimEntity) :
            Component.translatable(messageKey, victimEntity, killerEntity)

            //in case of non-player entities that have died, revert to normal (exception) messages
            if(hasIndirectKiller && !killerEntity){
                if (hasWeapon) {
                    deathMessageKey = deathMessageKey.slice(0, -5)
                    hasWeapon = false
                }
                deathMessageKey = deathMessageKey.slice(0, -7)

                messageKey = this.getRandomMessage(deathMessageKey)
                if (!messageKey) return null
                customDeathMessage = Component.translatable(messageKey, victimEntity)
            }

            
            if (hasWeapon) {
                let weaponArg = deathMessage.getContents().getArgs()[2]
                if (weaponArg) {
                    customDeathMessage = Component.empty()
                        .append(customDeathMessage)
                        .append(' ')
                        .append(Component.translatable(this.getRandomMessage("death.item")))
                        .append(' ')
                        .append(weaponArg)
                }
            }
        }
        else{
            customDeathMessage = !killerEntity ?
                Component.translatable(messageKey, victimEntity) :
                Component.translatable(messageKey, victimEntity)
                    .append(' ')
                    .append(killerMessage)

            // Add weapon information if present
            if (hasWeapon) {
                let weaponArg = deathMessage.getContents().getArgs()[2]
                if (weaponArg) {
                    customDeathMessage = Component.empty()
                        .append(customDeathMessage)
                        .append(' ')
                        .append(Component.translatable(this.getRandomMessage("death.item")))
                        .append(' ')
                        .append(weaponArg)
                }
            }
        }

        // Make red.
        customDeathMessage = customDeathMessage.withStyle(ChatFormatting.RED)

        return customDeathMessage

    },

    parseTranslatableContents(component){
        // Safety check
        if (!component) return null;
        
        // Get the contents of the component
        let contents = component.getContents();
        
        // If it's a translation component
        if (contents instanceof TranslatableContents) {
            // Convert Java array to JavaScript array using Array.prototype.slice
            let args = Array.prototype.slice.call(contents.getArgs());
            return {
                key: contents.getKey(),
                args: args.map(arg => {
                    if (arg instanceof Component) {
                        return this.parseTranslatableContents(arg);
                    }
                    return String(arg);
                })
            };
        }
        
        // If it's a text component or other type, return its string representation
        return component.getString();
    },


    handleDeathEvent(event) {
        try {
            let entity = event.getEntity()
            if (!this.shouldHandleEntity(entity)) return

            let server = entity.getLevel().getServer()
            if (!server) return
            let combatTracker = entity.getCombatTracker() ? entity.getCombatTracker() : null
            if(!combatTracker) return
            
            let source = event.source.getActual()
            
            let message = this.composeDeathMessage(source, entity, combatTracker)

            // Fallback for death types not added to instead modify vanilla message to be red
            if (!message) {
                let vanillaMessage = combatTracker.getDeathMessage()
                if (vanillaMessage) {
                    //event.setCanceled(true)
                    server.getPlayerList().broadcastSystemMessage(
                        vanillaMessage.withStyle(ChatFormatting.RED), 
                        false
                    )
                }
                return
            }
            // We do not want to cancel the LivingDeathEvent because e.g. gravestone creation depends on it
            // Instead, disable gamerule showDeathMessages
            //event.setCanceled(true)

            server.getPlayerList().broadcastSystemMessage(message, false)


        } catch (e) {
            console.error('Error in death message handler: ' + e.toString())
        }
    }
}

NativeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDeathEvent', event => {
    DeathMessageHandler.handleDeathEvent(event)
})