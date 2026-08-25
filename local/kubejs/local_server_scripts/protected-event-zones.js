// Miladycraft protected event zones
//
// A protected zone is any chunk claimed by an FTB Teams server team or by one
// of the stable team UUIDs below. Production admin claims can be ordinary party
// teams, so never match display names or duplicate claim coordinates here.
//
// Performance contract: event-driven only. Do not add tick handlers, scheduled
// scans, player-list scans, entity-list scans, or world/chunk iteration here.

(function () {

const $FTBChunksAPI = Java.loadClass('dev.ftb.mods.ftbchunks.api.FTBChunksAPI')
const $ChunkDimPos = Java.loadClass('dev.ftb.mods.ftblibrary.math.ChunkDimPos')
const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
const $Commands = Java.loadClass('net.minecraft.commands.Commands')
const $Component = Java.loadClass('net.minecraft.network.chat.Component')
const $InteractionResult = Java.loadClass('net.minecraft.world.InteractionResult')
const $DamageTypeTags = Java.loadClass('net.minecraft.tags.DamageTypeTags')
const $ItemTags = Java.loadClass('net.minecraft.tags.ItemTags')
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player')
const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const $ItemEntity = Java.loadClass('net.minecraft.world.entity.item.ItemEntity')
const $PrimedTnt = Java.loadClass('net.minecraft.world.entity.item.PrimedTnt')
const $AreaEffectCloud = Java.loadClass('net.minecraft.world.entity.AreaEffectCloud')
const $LightningBolt = Java.loadClass('net.minecraft.world.entity.LightningBolt')
const $Projectile = Java.loadClass('net.minecraft.world.entity.projectile.Projectile')
const $EvokerFangs = Java.loadClass('net.minecraft.world.entity.projectile.EvokerFangs')
const $FireworkRocketEntity = Java.loadClass('net.minecraft.world.entity.projectile.FireworkRocketEntity')
const $SpawnEggItem = Java.loadClass('net.minecraft.world.item.SpawnEggItem')
const $BucketItem = Java.loadClass('net.minecraft.world.item.BucketItem')
const $FireworkRocketItem = Java.loadClass('net.minecraft.world.item.FireworkRocketItem')
const $FishingRodItem = Java.loadClass('net.minecraft.world.item.FishingRodItem')
const $FlintAndSteelItem = Java.loadClass('net.minecraft.world.item.FlintAndSteelItem')
const $InstrumentItem = Java.loadClass('net.minecraft.world.item.InstrumentItem')
const $MaceItem = Java.loadClass('net.minecraft.world.item.MaceItem')
const $ProjectileItem = Java.loadClass('net.minecraft.world.item.ProjectileItem')
const $ProjectileWeaponItem = Java.loadClass('net.minecraft.world.item.ProjectileWeaponItem')
const $ThrowablePotionItem = Java.loadClass('net.minecraft.world.item.ThrowablePotionItem')
const $TridentItem = Java.loadClass('net.minecraft.world.item.TridentItem')
const $Enemy = Java.loadClass('net.minecraft.world.entity.monster.Enemy')
const $MobEffectCategory = Java.loadClass('net.minecraft.world.effect.MobEffectCategory')

const $RightClickItem = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickItem')
const $RightClickBlock = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickBlock')
const $EntityInteract = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$EntityInteract')
const $EntityInteractSpecific = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$EntityInteractSpecific')
const $LeftClickBlock = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$LeftClickBlock')
const $AttackEntity = Java.loadClass('net.neoforged.neoforge.event.entity.player.AttackEntityEvent')
const $IncomingDamage = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent')
const $EffectApplicable = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable')
const $EffectApplicationResult = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable$Result')
const $ExplosionDetonate = Java.loadClass('net.neoforged.neoforge.event.level.ExplosionEvent$Detonate')
const $EntityJoinLevel = Java.loadClass('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent')
const $EnteringSection = Java.loadClass('net.neoforged.neoforge.event.entity.EntityEvent$EnteringSection')
const $PlayerLoggedIn = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerLoggedInEvent')
const $PlayerLoggedOut = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerLoggedOutEvent')
const $PlayerChangedDimension = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')
const $PlayerRespawn = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerRespawnEvent')

const $GunShoot = Java.loadClass('com.tacz.guns.api.event.common.GunShootEvent')
const $GunFire = Java.loadClass('com.tacz.guns.api.event.common.GunFireEvent')
const $SpellPreCast = Java.loadClass('io.redspace.ironsspellbooks.api.events.SpellPreCastEvent')

const $BoomboxItem = Java.loadClass('gg.moonflower.etched.common.item.BoomboxItem')
const $EtchedComponents = Java.loadClass('gg.moonflower.etched.core.registry.EtchedComponents')
const $PausedComponent = Java.loadClass('gg.moonflower.etched.common.component.PausedComponent')

const PROTECTED_TEAM_IDS = new Set([
  '9ac96e28-57c1-465b-9d9a-41d584f01c1a'
])
const BLOCKED_ITEM_NAMESPACES = new Set([
  'cataclysm',
  'etched',
  'gamediscs',
  'irons_spellbooks',
  'tacz'
])
const BLOCKED_ITEM_IDS = new Set([
  'another_furniture:service_bell',
  'gateways:gate_pearl',
  'horseman:copper_horn',
  'immersive_aircraft:bomb_bay',
  'immersive_aircraft:heavy_crossbow',
  'immersive_aircraft:rotary_cannon',
  'industrialforegoing:infinity_hammer',
  'industrialforegoing:infinity_launcher',
  'industrialforegoing:infinity_nuke',
  'industrialforegoing:infinity_trident',
  'industrialforegoing:mycelial_rocket',
  'mekanism:electric_bow',
  'mekanism:flamethrower',
  'minecraft:end_crystal',
  'minecraft:respawn_anchor',
  'minecraft:tnt',
  'minecraft:tnt_minecart',
  'railcraft:whistle_tuner',
  'refurbished_furniture:doorbell',
  'supplementaries:cannonball',
  'supplementaries:flute',
  'supplementaries:slingshot',
  'supplementaries:spring_launcher',
  'touhou_little_maid:red_fox_scroll',
  'touhou_little_maid:servant_bell',
  'touhou_little_maid:white_fox_scroll'
])
const BLOCKED_ITEM_PREFIXES = [
  'supplementaries:bomb',
  'supplementaries:cannon'
]
const BLOCKED_BLOCK_NAMESPACES = new Set(['etched', 'gamediscs'])
const BLOCKED_BLOCK_IDS = new Set([
  'another_furniture:service_bell',
  'cc_mb:music_box_block',
  'computercraft:speaker',
  'minecraft:bell',
  'minecraft:jukebox',
  'minecraft:note_block',
  'minecraft:respawn_anchor',
  'refurbished_furniture:doorbell',
  'supplementaries:cannon',
  'supplementaries:speaker_block'
])
const DISRUPTIVE_ENTITY_NAMESPACES = new Set(['cataclysm', 'irons_spellbooks', 'tacz'])
const BLOCKED_DAMAGE_NAMESPACES = new Set(['cataclysm', 'irons_spellbooks', 'tacz'])
const BLOCKED_DAMAGE_IDS = new Set([
  'minecraft:dragon_breath',
  'minecraft:indirect_magic',
  'minecraft:magic',
  'minecraft:sonic_boom',
  'minecraft:wither',
  'minecraft:wither_skull'
])
const BOOMBOX_ID = 'etched:boombox'
const MESSAGE = $Component.literal('This item or action is disabled in the event area.')
const NOTICE_INTERVAL_TICKS = 40
const lastNoticeByPlayer = new Map()
const blockedItemByItem = new Map()
const blockedBlockByBlock = new Map()

function isPlayer(entity) {
  return entity != null && entity instanceof $Player
}

function isServerPlayer(entity) {
  return entity != null && entity instanceof $ServerPlayer
}

function hasOperatorBypass(player) {
  return isServerPlayer(player) && player.hasPermissions(2)
}

function isProtectedTeam(team) {
  return team != null && (team.isServerTeam() || PROTECTED_TEAM_IDS.has(String(team.getId())))
}

function claimedByProtectedTeam(pos) {
  const api = $FTBChunksAPI.api()
  if (!api.isManagerLoaded()) {
    return false
  }

  const chunk = api.getManager().getChunk(pos)
  return chunk != null && isProtectedTeam(chunk.getTeamData().getTeam())
}

function isProtectedEntity(entity) {
  return entity != null && claimedByProtectedTeam(new $ChunkDimPos(entity))
}

function isProtectedChunk(entity, chunkX, chunkZ) {
  return claimedByProtectedTeam(new $ChunkDimPos(entity.level.dimension, chunkX, chunkZ))
}

function isProtectedBlock(level, pos) {
  return claimedByProtectedTeam(new $ChunkDimPos(level.dimension, pos.getX() >> 4, pos.getZ() >> 4))
}

function itemId(stack) {
  if (stack == null || stack.isEmpty()) {
    return ''
  }
  return $BuiltInRegistries.ITEM.getKey(stack.getItem()).toString()
}

function hasBlockedPrefix(id) {
  for (const prefix of BLOCKED_ITEM_PREFIXES) {
    if (id.startsWith(prefix)) {
      return true
    }
  }
  return false
}

function isBlockedItem(stack) {
  if (stack == null || stack.isEmpty()) {
    return false
  }

  if (stack.getItem() instanceof $FireworkRocketItem) {
    return false
  }

  if (stack.getItem() instanceof $SpawnEggItem) {
    return true
  }

  if (stack.has($DataComponents.JUKEBOX_PLAYABLE)) {
    return true
  }

  const item = stack.getItem()
  const cached = blockedItemByItem.get(item)
  if (cached != null) {
    return cached
  }

  const id = $BuiltInRegistries.ITEM.getKey(item)
  const idText = id.toString()
  const tags = stack.getItemHolder().tags().toList()
  const blocked = BLOCKED_ITEM_NAMESPACES.has(id.getNamespace()) ||
    BLOCKED_ITEM_IDS.has(idText) ||
    hasBlockedPrefix(idText) ||
    tags.contains($ItemTags.WEAPON_ENCHANTABLE) ||
    tags.contains($ItemTags.CREEPER_IGNITERS) ||
    item instanceof $BucketItem ||
    item instanceof $FishingRodItem ||
    item instanceof $FlintAndSteelItem ||
    item instanceof $InstrumentItem ||
    item instanceof $MaceItem ||
    item instanceof $ProjectileItem ||
    item instanceof $ProjectileWeaponItem ||
    item instanceof $ThrowablePotionItem ||
    item instanceof $TridentItem
  blockedItemByItem.set(item, blocked)
  return blocked
}

function isBlockedBlock(level, pos) {
  const block = level.getBlockState(pos).getBlock()
  const cached = blockedBlockByBlock.get(block)
  if (cached != null) {
    return cached
  }

  const id = $BuiltInRegistries.BLOCK.getKey(block)
  const blocked = BLOCKED_BLOCK_NAMESPACES.has(id.getNamespace()) || BLOCKED_BLOCK_IDS.has(id.toString())
  blockedBlockByBlock.set(block, blocked)
  return blocked
}

function notifyBlocked(player) {
  if (!isServerPlayer(player)) {
    return
  }

  const now = player.level.gameTime
  const key = player.uuid.toString()
  const previous = lastNoticeByPlayer.get(key)
  if (previous == null || now - previous >= NOTICE_INTERVAL_TICKS) {
    lastNoticeByPlayer.set(key, now)
    player.displayClientMessage(MESSAGE, true)
  }
}

function denyBlockedItem(player, stack, event, hasCancellationResult) {
  // The cheap item identity test intentionally precedes the FTB claim lookup.
  if (!isBlockedItem(stack) || hasOperatorBypass(player) || !isProtectedEntity(player)) {
    return
  }

  if (hasCancellationResult) {
    event.setCancellationResult($InteractionResult.FAIL)
  }
  event.setCanceled(true)
  notifyBlocked(player)
}

function denyBlockedBlock(player, level, pos, event) {
  // As with items, avoid the claim lookup for nearly all block interactions.
  if (!isBlockedBlock(level, pos) || hasOperatorBypass(player) || !isProtectedEntity(player)) {
    return
  }

  event.setCancellationResult($InteractionResult.FAIL)
  event.setCanceled(true)
  notifyBlocked(player)
}

function denyModAction(player, event) {
  if (!isPlayer(player) || hasOperatorBypass(player) || !isProtectedEntity(player)) {
    return
  }

  event.setCanceled(true)
  notifyBlocked(player)
}

function isHostile(entity) {
  return entity != null && entity instanceof $Enemy
}

function entityTypeId(entity) {
  return $BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType())
}

function isDisruptiveEntity(entity) {
  if (entity instanceof $FireworkRocketEntity) {
    return false
  }

  return entity != null && (
    entity instanceof $Projectile ||
    entity instanceof $PrimedTnt ||
    entity instanceof $AreaEffectCloud ||
    entity instanceof $LightningBolt ||
    entity instanceof $EvokerFangs ||
    DISRUPTIVE_ENTITY_NAMESPACES.has(entityTypeId(entity).getNamespace())
  )
}

function disruptiveEntityOwner(entity) {
  if (entity instanceof $LightningBolt) {
    return entity.getCause()
  }
  if (entity instanceof $Projectile || entity instanceof $PrimedTnt ||
      entity instanceof $AreaEffectCloud || entity instanceof $EvokerFangs) {
    return entity.getOwner()
  }
  return null
}

function shouldBlockDisruptiveEntity(entity) {
  return isDisruptiveEntity(entity) && !hasOperatorBypass(disruptiveEntityOwner(entity))
}

function isHarmfulEffect(instance) {
  return instance != null && instance.getEffect().value().getCategory() === $MobEffectCategory.HARMFUL
}

function removeHarmfulEffects(player) {
  if (!isPlayer(player)) {
    return
  }

  const active = player.getActiveEffects().toArray()
  for (const instance of active) {
    if (isHarmfulEffect(instance)) {
      player.removeEffect(instance.getEffect())
    }
  }
}

function damageTypeId(source) {
  const key = source.typeHolder().unwrapKey()
  return key.isPresent() ? key.get().location() : null
}

function isDisruptiveDamage(source) {
  const direct = source.getImmediate()
  if (isDisruptiveEntity(direct) || source.is($DamageTypeTags.IS_PROJECTILE) ||
      source.is($DamageTypeTags.IS_EXPLOSION) || source.is($DamageTypeTags.IS_LIGHTNING)) {
    return true
  }

  const id = damageTypeId(source)
  return id != null && (BLOCKED_DAMAGE_NAMESPACES.has(id.getNamespace()) || BLOCKED_DAMAGE_IDS.has(id.toString()))
}

function protectExplosion(event) {
  const level = event.getLevel()
  const protectedChunks = new Map()
  const blocks = event.getAffectedBlocks().iterator()
  while (blocks.hasNext()) {
    const pos = blocks.next()
    const chunkX = pos.getX() >> 4
    const chunkZ = pos.getZ() >> 4
    const key = `${chunkX},${chunkZ}`
    let protectedChunk = protectedChunks.get(key)
    if (protectedChunk == null) {
      protectedChunk = isProtectedBlock(level, pos)
      protectedChunks.set(key, protectedChunk)
    }
    if (protectedChunk) {
      blocks.remove()
    }
  }

  const entities = event.getAffectedEntities().iterator()
  while (entities.hasNext()) {
    if (isProtectedEntity(entities.next())) {
      entities.remove()
    }
  }
}

function pauseBoombox(stack) {
  if (itemId(stack) !== BOOMBOX_ID || !$BoomboxItem.hasRecord(stack)) {
    return false
  }

  const paused = $EtchedComponents.PAUSED.get()
  if (stack.has(paused)) {
    return false
  }

  stack.set(paused, $PausedComponent.INSTANCE)
  return true
}

function pausePlayerBoomboxes(player) {
  if (!isServerPlayer(player) || hasOperatorBypass(player)) {
    return false
  }

  const inventory = player.getInventory()
  let changed = false
  for (let slot = 0; slot < inventory.getContainerSize(); slot++) {
    changed = pauseBoombox(inventory.getItem(slot)) || changed
  }

  const carried = player.containerMenu.getCarried()
  changed = pauseBoombox(carried) || changed
  if (changed) {
    inventory.setChanged()
    player.containerMenu.broadcastChanges()
    notifyBlocked(player)
  }
  return changed
}

function damagingPlayer(source) {
  const player = source.getPlayer()
  return isPlayer(player) ? player : null
}

function handleProtectedArrival(entity, protectedChunk) {
  if (!protectedChunk) {
    return
  }

  if (isHostile(entity) || shouldBlockDisruptiveEntity(entity)) {
    entity.discard()
  } else if (isServerPlayer(entity)) {
    pausePlayerBoomboxes(entity)
    removeHarmfulEffects(entity)
  } else if (entity instanceof $ItemEntity) {
    const stack = entity.getItem()
    if (pauseBoombox(stack)) {
      entity.setItem(stack)
    }
  }
}

function reconcileLoadedEntities(server) {
  let visited = 0
  let removed = 0
  let players = 0
  for (const level of server.getAllLevels()) {
    for (const entity of level.getAllEntities()) {
      if (entity.isRemoved()) {
        continue
      }
      visited++
      if (!isProtectedEntity(entity)) {
        continue
      }

      if (isHostile(entity) || shouldBlockDisruptiveEntity(entity)) {
        entity.discard()
        removed++
      } else if (isServerPlayer(entity)) {
        pausePlayerBoomboxes(entity)
        removeHarmfulEffects(entity)
        players++
      } else if (entity instanceof $ItemEntity) {
        const stack = entity.getItem()
        if (pauseBoombox(stack)) {
          entity.setItem(stack)
        }
      }
    }
  }
  return { visited: visited, removed: removed, players: players }
}

function isRelevantArrival(entity) {
  return isHostile(entity) || isDisruptiveEntity(entity) || isServerPlayer(entity) ||
    (entity instanceof $ItemEntity && itemId(entity.getItem()) === BOOMBOX_ID)
}

NativeEvents.onEvent($RightClickItem, event => {
  denyBlockedItem(event.getEntity(), event.getItemStack(), event, true)
})

NativeEvents.onEvent($RightClickBlock, event => {
  var rightBlockPlayer = event.getEntity()
  denyBlockedItem(rightBlockPlayer, event.getItemStack(), event, true)
  if (!event.isCanceled()) {
    denyBlockedBlock(rightBlockPlayer, event.getLevel(), event.getPos(), event)
  }
})

NativeEvents.onEvent($EntityInteract, event => {
  denyBlockedItem(event.getEntity(), event.getItemStack(), event, true)
})

NativeEvents.onEvent($EntityInteractSpecific, event => {
  denyBlockedItem(event.getEntity(), event.getItemStack(), event, true)
})

NativeEvents.onEvent($LeftClickBlock, event => {
  denyBlockedItem(event.getEntity(), event.getItemStack(), event, false)
})

NativeEvents.onEvent($AttackEntity, event => {
  var attackPlayer = event.getEntity()
  var attackTarget = event.getTarget()
  if (isPlayer(attackTarget) && (isProtectedEntity(attackPlayer) || isProtectedEntity(attackTarget))) {
    event.setCanceled(true)
    notifyBlocked(attackPlayer)
    return
  }
  denyBlockedItem(attackPlayer, attackPlayer.getMainHandItem(), event, false)
})

NativeEvents.onEvent($GunShoot, event => {
  denyModAction(event.getShooter(), event)
})

NativeEvents.onEvent($GunFire, event => {
  denyModAction(event.getShooter(), event)
})

NativeEvents.onEvent($SpellPreCast, event => {
  denyModAction(event.getEntity(), event)
})

NativeEvents.onEvent($IncomingDamage, event => {
  var damageVictim = event.getEntity()
  if (!isPlayer(damageVictim)) {
    return
  }

  var damageSource = event.getSource()
  var damageAttacker = damageSource.getActual()
  var damagePlayer = damagingPlayer(damageSource)
  var protectedDamageVictim = isProtectedEntity(damageVictim)

  if ((damagePlayer != null && (protectedDamageVictim || isProtectedEntity(damagePlayer))) ||
      (protectedDamageVictim && (damageAttacker != null || isDisruptiveDamage(damageSource)))) {
    event.setCanceled(true)
    if (damagePlayer != null) {
      notifyBlocked(damagePlayer)
    }
  }
})

NativeEvents.onEvent($EffectApplicable, event => {
  var effectTarget = event.getEntity()
  if (isPlayer(effectTarget) && isHarmfulEffect(event.getEffectInstance()) && isProtectedEntity(effectTarget)) {
    event.setResult($EffectApplicationResult.DO_NOT_APPLY)
  }
})

NativeEvents.onEvent($ExplosionDetonate, event => {
  protectExplosion(event)
})

NativeEvents.onEvent($EntityJoinLevel, event => {
  if (event.getLevel().isClientSide()) {
    return
  }

  var joinedEntity = event.getEntity()
  if ((isHostile(joinedEntity) || shouldBlockDisruptiveEntity(joinedEntity)) && isProtectedEntity(joinedEntity)) {
    event.setCanceled(true)
  } else if (joinedEntity instanceof $ItemEntity &&
      itemId(joinedEntity.getItem()) === BOOMBOX_ID && isProtectedEntity(joinedEntity)) {
    var joinedStack = joinedEntity.getItem()
    if (pauseBoombox(joinedStack)) {
      joinedEntity.setItem(joinedStack)
    }
  }
})

NativeEvents.onEvent($EnteringSection, event => {
  if (!event.didChunkChange()) {
    return
  }

  var sectionEntity = event.getEntity()
  if (!isRelevantArrival(sectionEntity)) {
    return
  }

  var nextSection = event.getNewPos()
  handleProtectedArrival(sectionEntity, isProtectedChunk(sectionEntity, nextSection.getX(), nextSection.getZ()))
})

NativeEvents.onEvent($PlayerLoggedIn, event => {
  var loggedInPlayer = event.getEntity()
  if (isProtectedEntity(loggedInPlayer)) {
    pausePlayerBoomboxes(loggedInPlayer)
    removeHarmfulEffects(loggedInPlayer)
  }
})

NativeEvents.onEvent($PlayerLoggedOut, event => {
  lastNoticeByPlayer.delete(event.getEntity().uuid.toString())
})

NativeEvents.onEvent($PlayerChangedDimension, event => {
  var dimensionPlayer = event.getEntity()
  if (isProtectedEntity(dimensionPlayer)) {
    pausePlayerBoomboxes(dimensionPlayer)
    removeHarmfulEffects(dimensionPlayer)
  }
})

NativeEvents.onEvent($PlayerRespawn, event => {
  var respawnedPlayer = event.getEntity()
  if (isProtectedEntity(respawnedPlayer)) {
    pausePlayerBoomboxes(respawnedPlayer)
    removeHarmfulEffects(respawnedPlayer)
  }
})

ServerEvents.commandRegistry(event => {
  event.register($Commands.literal('minetiger_event_zone_reconcile')
    .requires(source => source.hasPermission(4))
    .executes(context => {
      var reconcileSource = context.getSource()
      var reconcileResult = reconcileLoadedEntities(reconcileSource.getServer())
      var reconcileText = `event-zone-reconcile=success visited=${reconcileResult.visited} removed=${reconcileResult.removed} players=${reconcileResult.players}`
      reconcileSource.sendSuccess($Component.literal(reconcileText), false)
      console.info(`[Miladycraft] ${reconcileText}`)
      return 1
    }))
})

console.info('[Miladycraft] Protected event-zone policy registered (native events; no polling)')
})()
