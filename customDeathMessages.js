// Class imports
let TamableAnimal = Java.loadClass('net.minecraft.world.entity.TamableAnimal')
let LivingDeathEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingDeathEvent')
let Component = Java.loadClass('net.minecraft.network.chat.Component')
let Player = Java.loadClass('net.minecraft.world.entity.player.Player')

let deathMessages = {
    bullet: {
        direct: [
            'was turned into Swiss cheese by %k',
            'was blammed by %k',
            'was drilled by %k',
            'was clapped by %k',
            'was eliminated by %k',
            'was executed by %k',
            'was annihilated by %k',
            'was decimated by %k',
            'was eviscerated by %k',
            'was expunged by %k',
            'was silenced by %k',
            'was kevorked by %k',
            'was butchered by %k',
            'was torpedoed by %k',
            'was abolished by %k',
            'was iced by %k',
            'was slapped by %k',
            'was wasted by %k',
            'was smoked by %k',
            'was pwned by %k',
            'was nailed by %k',
            'was perforated by %k',
            'was ventilated by %k',
            'was lead-poisoned by %k',
            'was crushed by %k',
            'was shell-shocked by %k',
            'was liquidated by %k',
            'was euthanized by %k'
        ],
        indirect: []
    },
    outOfWorld: {
        direct: ['fell into the Void'],
        indirect: ['fell into the Void while running from %k']
    },
    fall: {
        direct: ['hit the ground too hard', 'fell from a high place'],
        indirect: ['hit the ground too hard while escaping %k', 'fell from a high place trying to escape %k']
    },
    onFire: {
        direct: ['burned to death', 'turned to ash', 'became too spicy', 'spontaneously combusted'],
        indirect: ['burned to death while fighting %k', 'turned to ash while dueling %k', 'became too spicy thanks to %k']
    },
    inFire: {
        direct: ['burned to death', 'turned to ash', 'became too spicy', 'spontaneously combusted'],
        indirect: ['burned to death while fighting %k', 'turned to ash while dueling %k', 'became too spicy thanks to %k']
    },
    explosion: {
        direct: ['went boom', 'was instagibbed', 'was blown to bits', 'became confetti', 'was biomassed'],
        indirect: ['was blown up while fighting %k']
    },
    drowning: {
        direct: ['forgot to breathe', 'became fish food', 'took a long dive', 'was sent to Davy Jones\' locker'],
        indirect: ['drowned while trying to escape %k']
    }
}

const DeathMessageHandler = {
    messages: deathMessages,

    getEntityName(entity) {
        return entity.getName().getString()
    },

    getRandomMessage(category, messageType) {
        if (!this.messages[category] || !this.messages[category][messageType]) {
            return null
        }
        let messages = this.messages[category][messageType]
        return messages[Math.floor(Math.random() * messages.length)]
    },

    getDeathType(source) {
        if (!source || !source.type) return null
        let damageType = source.type
        console.log(`Damage type on death: ${damageType}`)
        return this.messages.hasOwnProperty(damageType) ? damageType : null
    },

    shouldHandleEntity(entity) {
        return entity.isPlayer()
    },

    composeDeathMessage(entity, source, combatTracker) {
        let victimName = this.getEntityName(entity)
        let deathType = this.getDeathType(source)
        
        if (!deathType) return null
        
        let directKiller = null
        let lastAttacker = null
        
        if (source) directKiller = source.attacker
        if (combatTracker) lastAttacker = entity.lastAttacker
        
        let hasIndirectKiller = lastAttacker && (!directKiller || directKiller !== lastAttacker)
        let killer = hasIndirectKiller ? lastAttacker : directKiller
        
        let messageType = hasIndirectKiller && 
                         this.messages[deathType].indirect.length > 0 
                         ? 'indirect' 
                         : 'direct'
        
        let message = this.getRandomMessage(deathType, messageType)
        if (!message) return null
        
        if (!killer) {
            return '§c' + victimName + ' ' + message
        }
        
        let killerName = this.getEntityName(killer)
        return '§c' + victimName + ' ' + message.replace('%k', '§c' + killerName + '§7')
    },

    handleDeathEvent(event) {
        try {
            let entity = event.getEntity()
            if (!this.shouldHandleEntity(entity)) return
            
            let source = event.getSource()
            let deathType = this.getDeathType(source)
            if (!deathType) return
            
            let server = entity.getLevel().getServer()
            if (!server) return

            let combatTracker = entity.getCombatTracker() ? entity.getCombatTracker() : null
            
            let message = this.composeDeathMessage(
                entity, 
                source, 
                combatTracker
            )
            
            if (!message) return
            
            event.setCanceled(true)
            server.getPlayerList().broadcastSystemMessage(
                Component.literal(message),
                false
            )
        } catch (e) {
            console.error('Error in death message handler: ' + e.toString())
        }
    },

    addDeathType(type, directMessages, indirectMessages) {
        if (typeof type !== 'string' || 
            !Array.isArray(directMessages) || 
            !Array.isArray(indirectMessages)) {
            console.error('Invalid death type or messages format')
            return false
        }
        
        let normalizedType = type
        this.messages[normalizedType] = {
            direct: directMessages.slice(),
            indirect: indirectMessages.slice()
        }
        
        return true
    }
}

// Register the event handler
NativeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDeathEvent', event => {
    DeathMessageHandler.handleDeathEvent(event)
})

// Export the handler if needed
// export default DeathMessageHandler;