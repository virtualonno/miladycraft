// Miladycraft global Mekanism radiation policy.
//
// This policy is independent of FTB claims. Radiation is disabled everywhere
// because persistent fallout can cross claim boundaries and has no adequate
// operator cleanup command in the shipped Mekanism version.

(function () {

const $MekanismConfig = Java.loadClass('mekanism.common.config.MekanismConfig')
const $RadiationManager = Java.loadClass('mekanism.common.lib.radiation.RadiationManager')
const $PlayerExposure = Java.loadClass('mekanism.common.lib.radiation.PlayerExposure')
const $Capabilities = Java.loadClass('mekanism.common.capabilities.Capabilities')
const $Commands = Java.loadClass('net.minecraft.commands.Commands')
const $Component = Java.loadClass('net.minecraft.network.chat.Component')

const $ServerStarted = Java.loadClass('net.neoforged.neoforge.event.server.ServerStartedEvent')
const $IncomingDamage = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent')
const $PlayerLoggedIn = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerLoggedInEvent')
const $PlayerChangedDimension = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')
const $PlayerRespawn = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerRespawnEvent')

function disableAndClearRadiation() {
  $MekanismConfig.general.radiationEnabled.set(false)
  $MekanismConfig.general.getConfigSpec().save()
  $RadiationManager.get().clearSources()
  $PlayerExposure.clear()

  if ($RadiationManager.isGlobalRadiationEnabled()) {
    throw new Error('Mekanism radiation remained enabled after applying the server policy')
  }
}

function clearPlayerRadiation(player) {
  const radiation = player.getCapability($Capabilities.RADIATION_ENTITY)
  if (radiation != null) {
    radiation.set(0.0)
  }
  $PlayerExposure.resetPlayer(player.uuid)
}

function reconcileRadiation(server) {
  disableAndClearRadiation()
  let players = 0
  for (const player of server.getPlayerList().getPlayers()) {
    clearPlayerRadiation(player)
    players++
  }
  return players
}

// Server scripts can be loaded both during startup and by a live resource
// reload. Apply immediately for the latter and repeat after level data loads.
disableAndClearRadiation()

NativeEvents.onEvent($ServerStarted, event => {
  disableAndClearRadiation()
})

NativeEvents.onEvent($IncomingDamage, event => {
  var radiationDamageSource = event.getSource()
  if (radiationDamageSource.is($RadiationManager.get().getRadiationDamageTypeKey())) {
    event.setCanceled(true)
  }
})

NativeEvents.onEvent($PlayerLoggedIn, event => {
  clearPlayerRadiation(event.getEntity())
})

NativeEvents.onEvent($PlayerChangedDimension, event => {
  clearPlayerRadiation(event.getEntity())
})

NativeEvents.onEvent($PlayerRespawn, event => {
  clearPlayerRadiation(event.getEntity())
})

ServerEvents.commandRegistry(event => {
  event.register($Commands.literal('minetiger_radiation_reconcile')
    .requires(source => source.hasPermission(4))
    .executes(context => {
      var radiationReconcileSource = context.getSource()
      var radiationReconcilePlayers = reconcileRadiation(radiationReconcileSource.getServer())
      var radiationReconcileText = `radiation-reconcile=success players=${radiationReconcilePlayers}`
      radiationReconcileSource.sendSuccess($Component.literal(radiationReconcileText), false)
      console.info(`[Miladycraft] ${radiationReconcileText}`)
      return 1
    }))
})

console.info('[Miladycraft] Mekanism radiation disabled and environmental sources cleared')
})()
