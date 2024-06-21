
const $GlazedTerracottaBlock = Java.loadClass('net.minecraft.world.level.block.GlazedTerracottaBlock')
const $BProperties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')
const $Material = Java.loadClass('net.minecraft.world.level.material.Material')
const $SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
const $IProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')


let customBlocks = {}
StartupEvents.registry('block', (event) => {
	// event.create('cream_glazed_terracotta')
		// .material('stone')
		// .hardness(1.4)
		// .resistance(1.4)
		// .displayName('Cream Glazed Terracotta')
		// .tagBlock('minecraft:mineable/pickaxe')
		// .requiresTool(true)
		// .property(BlockProperties.FACING)
		// .placementState(context => context['set(net.minecraft.world.level.block.state.properties.EnumProperty,java.lang.Enum)'](BlockProperties.FACING, context.getClickedFace()))
        // .defaultCutout()

	customBlocks.amaranthTerracotta 	= 	event.createCustom('amaranth_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.amberTerracotta 		= 	event.createCustom('amber_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.aquamarineTerracotta 	= 	event.createCustom('aquamarine_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.beigeTerracotta 		= 	event.createCustom('beige_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.chartreuseTerracotta 	= 	event.createCustom('chartreuse_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.creamTerracotta		= 	event.createCustom('cream_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.darkgreenTerracotta 	= 	event.createCustom('dark_green_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.forestgreenTerracotta 	= 	event.createCustom('forest_green_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.hotpinkTerracotta 		= 	event.createCustom('hot_pink_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.indigoTerracotta 		= 	event.createCustom('indigo_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.maroonTerracotta 		= 	event.createCustom('maroon_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.navyTerracotta 		= 	event.createCustom('navy_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.oliveTerracotta 		=	event.createCustom('olive_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))
	customBlocks.palegreenTerracotta 	= 	event.createCustom('pale_green_glazed_terracotta', () => new $GlazedTerracottaBlock($BProperties.of($Material.STONE).sound($SoundType.STONE).strength(1.4, 1.4).requiresCorrectToolForDrops()))

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})

StartupEvents.registry('item', event => {
	 event.createCustom('amaranth_glazed_terracotta', () => new $BlockItem(customBlocks.amaranthTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('amber_glazed_terracotta', () => new $BlockItem(customBlocks.amberTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('aquamarine_glazed_terracotta', () => new $BlockItem(customBlocks.aquamarineTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('beige_glazed_terracotta', () => new $BlockItem(customBlocks.beigeTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('chartreuse_glazed_terracotta', () => new $BlockItem(customBlocks.chartreuseTerracotta.get(), new $IProperties().tab($KubeJS.tab)))	 
	 event.createCustom('cream_glazed_terracotta', () => new $BlockItem(customBlocks.creamTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('dark_green_glazed_terracotta', () => new $BlockItem(customBlocks.darkgreenTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('forest_green_glazed_terracotta', () => new $BlockItem(customBlocks.forestgreenTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('hot_pink_glazed_terracotta', () => new $BlockItem(customBlocks.hotpinkTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('indigo_glazed_terracotta', () => new $BlockItem(customBlocks.indigoTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('maroon_glazed_terracotta', () => new $BlockItem(customBlocks.maroonTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('navy_glazed_terracotta', () => new $BlockItem(customBlocks.navyTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('olive_glazed_terracotta', () => new $BlockItem(customBlocks.oliveTerracotta.get(), new $IProperties().tab($KubeJS.tab)))
	 event.createCustom('pale_green_glazed_terracotta', () => new $BlockItem(customBlocks.palegreenTerracotta.get(), new $IProperties().tab($KubeJS.tab)))	 
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.