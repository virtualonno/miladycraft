// credit to Liopyu from KubeJS Discord

const $MinecraftForge = Java.loadClass('net.minecraftforge.common.MinecraftForge')
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
//const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
if ($KubeJS.startupScriptManager.firstLoad) {
  $MinecraftForge.EVENT_BUS.addListener($EventPriority.LOW, false, Java.loadClass('net.minecraftforge.event.entity.player.ItemTooltipEvent'), event => global.tooltips(event))
}
/**
 * 
 * @param {Internal.ItemTooltipEvent} event 
 * @returns 
 */
global.tooltips = (event) => {
  let rangeAttack = Text.translate("generic.attack_range").string
  event.toolTip.removeIf(comp => comp.toFlatList().stream().anyMatch(flatComp => flatComp.string.includes(rangeAttack)))
//   if (event.itemStack.id != 'minecraft:enchanted_book') return
//   let remove = (component => {
//     if (component.contents?.key){
//       if (component.contents.key.startsWith("%s ┇ %s")) return true
//       if (component.contents.key == "info.apotheosis.book_range") return true
//     } 
//     return false
//   })
//   event.toolTip.removeIf(comp => remove(comp))
}