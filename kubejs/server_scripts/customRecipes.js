ServerEvents.recipes( event => {
	
	console.log('Firing Miladycraft custom recipes event')

	event.stonecutting('minecraft:gravel', 'minecraft:cobblestone')
	event.stonecutting('minecraft:sand', 'minecraft:gravel')

	let eggMimicreamList = [
		'minecraft:allay_spawn_egg','minecraft:axolotl_spawn_egg','minecraft:bat_spawn_egg','minecraft:bee_spawn_egg','minecraft:blaze_spawn_egg','minecraft:cat_spawn_egg',
		'minecraft:cave_spider_spawn_egg','minecraft:chicken_spawn_egg','minecraft:cod_spawn_egg','minecraft:cow_spawn_egg','minecraft:creeper_spawn_egg',
		'minecraft:dolphin_spawn_egg','minecraft:donkey_spawn_egg','minecraft:drowned_spawn_egg','minecraft:elder_guardian_spawn_egg','minecraft:enderman_spawn_egg',
		'minecraft:endermite_spawn_egg','minecraft:evoker_spawn_egg','minecraft:fox_spawn_egg','minecraft:frog_spawn_egg','minecraft:ghast_spawn_egg',
		'minecraft:glow_squid_spawn_egg','minecraft:goat_spawn_egg','minecraft:guardian_spawn_egg','minecraft:hoglin_spawn_egg','minecraft:horse_spawn_egg',
		'minecraft:husk_spawn_egg','minecraft:llama_spawn_egg','minecraft:magma_cube_spawn_egg','minecraft:mooshroom_spawn_egg','minecraft:mule_spawn_egg',
		'minecraft:ocelot_spawn_egg','minecraft:panda_spawn_egg','minecraft:parrot_spawn_egg','minecraft:phantom_spawn_egg','minecraft:pig_spawn_egg',
		'minecraft:piglin_spawn_egg','minecraft:piglin_brute_spawn_egg','minecraft:pillager_spawn_egg','minecraft:polar_bear_spawn_egg','minecraft:pufferfish_spawn_egg',
		'minecraft:rabbit_spawn_egg','minecraft:ravager_spawn_egg','minecraft:salmon_spawn_egg','minecraft:sheep_spawn_egg','minecraft:shulker_spawn_egg',
		'minecraft:silverfish_spawn_egg','minecraft:skeleton_spawn_egg','minecraft:skeleton_horse_spawn_egg','minecraft:slime_spawn_egg','minecraft:spider_spawn_egg',
		'minecraft:squid_spawn_egg','minecraft:stray_spawn_egg','minecraft:strider_spawn_egg','minecraft:tadpole_spawn_egg','minecraft:trader_llama_spawn_egg',
		'minecraft:tropical_fish_spawn_egg','minecraft:turtle_spawn_egg','minecraft:vex_spawn_egg','minecraft:villager_spawn_egg','minecraft:vindicator_spawn_egg',
		'minecraft:wandering_trader_spawn_egg','minecraft:witch_spawn_egg','minecraft:wither_skeleton_spawn_egg','minecraft:wolf_spawn_egg','minecraft:zoglin_spawn_egg',
		'minecraft:zombie_spawn_egg','minecraft:zombie_horse_spawn_egg','minecraft:zombie_villager_spawn_egg','minecraft:zombified_piglin_spawn_egg',
		'iwannaskate:spawn_egg_skater_skeleton','iwannaskate:spawn_egg_wandering_skater','goated:geep_spawn_egg','windswept:chilled_spawn_egg',
		'alexsmobs:spawn_egg_alligator_snapping_turtle','alexsmobs:spawn_egg_anaconda','alexsmobs:spawn_egg_anteater','alexsmobs:spawn_egg_bald_eagle',
		'alexsmobs:spawn_egg_banana_slug','alexsmobs:spawn_egg_bison','alexsmobs:spawn_egg_blobfish','alexsmobs:spawn_egg_blue_jay','alexsmobs:spawn_egg_bone_serpent',
		'alexsmobs:spawn_egg_bunfungus','alexsmobs:spawn_egg_cachalot_whale','alexsmobs:spawn_egg_capuchin_monkey','alexsmobs:spawn_egg_catfish',
		'alexsmobs:spawn_egg_centipede','alexsmobs:spawn_egg_cockroach','alexsmobs:spawn_egg_comb_jelly','alexsmobs:spawn_egg_cosmaw','alexsmobs:spawn_egg_cosmic_cod',
		'alexsmobs:spawn_egg_crimson_mosquito','alexsmobs:spawn_egg_crocodile','alexsmobs:spawn_egg_devils_hole_pupfish','alexsmobs:spawn_egg_dropbear',
		'alexsmobs:spawn_egg_elephant','alexsmobs:spawn_egg_emu','alexsmobs:spawn_egg_endergrade','alexsmobs:spawn_egg_enderiophage','alexsmobs:spawn_egg_farseer',
		'alexsmobs:spawn_egg_flutter','alexsmobs:spawn_egg_fly','alexsmobs:spawn_egg_flying_fish','alexsmobs:spawn_egg_frilled_shark','alexsmobs:spawn_egg_froststalker',
		'alexsmobs:spawn_egg_gazelle','alexsmobs:spawn_egg_gelada_monkey','alexsmobs:spawn_egg_giant_squid','alexsmobs:spawn_egg_gorilla','alexsmobs:spawn_egg_grizzly_bear',
		'alexsmobs:spawn_egg_guster','alexsmobs:spawn_egg_hammerhead_shark','alexsmobs:spawn_egg_jerboa','alexsmobs:spawn_egg_kangaroo','alexsmobs:spawn_egg_komodo_dragon',
		'alexsmobs:spawn_egg_laviathan','alexsmobs:spawn_egg_lobster','alexsmobs:spawn_egg_maned_wolf','alexsmobs:spawn_egg_mantis_shrimp','alexsmobs:spawn_egg_mimic_octopus',
		'alexsmobs:spawn_egg_mimicube','alexsmobs:spawn_egg_moose','alexsmobs:spawn_egg_mudskipper','alexsmobs:spawn_egg_mungus','alexsmobs:spawn_egg_murmur',
		'alexsmobs:spawn_egg_orca','alexsmobs:spawn_egg_platypus','alexsmobs:spawn_egg_potoo','alexsmobs:spawn_egg_raccoon','alexsmobs:spawn_egg_rain_frog',
		'alexsmobs:spawn_egg_rattlesnake','alexsmobs:spawn_egg_rhinoceros','alexsmobs:spawn_egg_roadrunner','alexsmobs:spawn_egg_rocky_roller','alexsmobs:spawn_egg_seagull',
		'alexsmobs:spawn_egg_seal','alexsmobs:spawn_egg_shoebill','alexsmobs:spawn_egg_skelewag','alexsmobs:spawn_egg_skreecher','alexsmobs:spawn_egg_skunk',
		'alexsmobs:spawn_egg_snow_leopard','alexsmobs:spawn_egg_soul_vulture','alexsmobs:spawn_egg_spectre','alexsmobs:spawn_egg_straddler','alexsmobs:spawn_egg_stradpole',
		'alexsmobs:spawn_egg_sugar_glider','alexsmobs:spawn_egg_sunbird','alexsmobs:spawn_egg_tarantula_hawk','alexsmobs:spawn_egg_tasmanian_devil','alexsmobs:spawn_egg_tiger',
		'alexsmobs:spawn_egg_toucan','alexsmobs:spawn_egg_tusklin','alexsmobs:spawn_egg_underminer','alexsmobs:spawn_egg_warped_toad','autumnity:snail_spawn_egg',
		'autumnity:turkey_spawn_egg','buzzier_bees:moobloom_spawn_egg','environmental:deer_spawn_egg','environmental:duck_spawn_egg','environmental:koi_spawn_egg','environmental:reindeer_spawn_egg',
		'environmental:slabfish_spawn_egg','environmental:tapir_spawn_egg','environmental:yak_spawn_egg','environmental:zebra_spawn_egg','irons_spellbooks:archevoker_spawn_egg',
		'irons_spellbooks:cryomancer_spawn_egg','irons_spellbooks:keeper_spawn_egg','irons_spellbooks:necromancer_spawn_egg','irons_spellbooks:priest_spawn_egg',
		'irons_spellbooks:pyromancer_spawn_egg','takesapillage:archer_spawn_egg','takesapillage:legioner_spawn_egg','takesapillage:skirmisher_spawn_egg',
		'savage_and_ravage:executioner_spawn_egg','savage_and_ravage:griefer_spawn_egg','savage_and_ravage:iceologer_spawn_egg','savage_and_ravage:skeleton_villager_spawn_egg',
		'savage_and_ravage:trickster_spawn_egg','sullysmod:tortoise_spawn_egg','endergetic:booflo_spawn_egg','endergetic:puff_bug_spawn_egg','upgrade_aquatic:flare_spawn_egg',
		'upgrade_aquatic:goose_spawn_egg','upgrade_aquatic:lionfish_spawn_egg','upgrade_aquatic:nautilus_spawn_egg','upgrade_aquatic:perch_spawn_egg',
		'upgrade_aquatic:pike_spawn_egg','upgrade_aquatic:thrasher_spawn_egg','caverns_and_chasms:deeper_spawn_egg','caverns_and_chasms:glare_spawn_egg',
		'caverns_and_chasms:mime_spawn_egg','caverns_and_chasms:peeper_spawn_egg','atmospheric:cochineal_spawn_egg',
		'neapolitan:chimpanzee_spawn_egg','neapolitan:plantain_spider_spawn_egg','quark:forgotten_spawn_egg','quark:foxhound_spawn_egg','quark:shiba_spawn_egg',
		'quark:toretoise_spawn_egg','snowyspirit:gingerbread_golem_spawn_egg'
	]
	let eggMimicreamRecipe = (egg) => {
		event.shaped(egg, [
			'SSS',
			'SDS',
			'SSS'
		], {
			S: 'alexsmobs:mimicream',
			D: egg
		}).keepIngredient(egg)
	}
	eggMimicreamList.forEach(egg => {
		eggMimicreamRecipe(egg)
	})

	
	let sandDying = (output, dyeInput) => {
		event.shaped(output, [
			'SSS',
			'SDS',
			'SSS'
		], {
			S: 'minecraft:sand',
			D: dyeInput
		})
	}
		sandDying('8x minecraft:red_sand', 'minecraft:red_dye')
		sandDying('8x byg:black_sand', 'minecraft:black_dye')
		sandDying('8x byg:white_sand', 'minecraft:white_dye')
		sandDying('8x byg:blue_sand', 'minecraft:blue_dye')
		sandDying('8x byg:purple_sand', 'minecraft:purple_dye')
		sandDying('8x byg:pink_sand', 'minecraft:pink_dye')

	event.shapeless(
		Item.of('byg:windswept_sand', 3),
		[
			'minecraft:sand',
			'minecraft:sand',
			'minecraft:sand',
			'quark:bottled_cloud'
		]
	).replaceIngredient('quark:bottled_cloud', 'minecraft:glass_bottle')
	
	event.shaped(
		Item.of('craftingcraft:portable_crafting', 1),
		[
			' A',
			'B '
		],
		{
			A: '#forge:workbench',
			B: 'minecraft:stick'
		}
	)
	
	event.shaped(
		Item.of('minecraft:bread', 1),
		[
			'AAA'
		],
		{ 
			A: 'minecraft:wheat'
		}
	)
	
	event.shapeless(
		Item.of('neapolitan:ice_cubes', 1),
		[
			'minecraft:ice'
		]
	)
	
	event.shapeless(
		Item.of('neapolitan:ice_cubes', 3),
		[
			'minecraft:packed_ice'
		]
	)

	event.shapeless(
		Item.of('neapolitan:ice_cubes', 9),
		[
			'minecraft:blue_ice'
		]
	)
	
	event.shaped(
		Item.of('environmental:large_lily_pad', 1),
		[
			'AA ',
			'AA ',
			'  B'
		],
		{
			A: 'minecraft:lily_pad',
			B: 'minecraft:bone_meal'
		}
	)
	
	event.shaped(
		Item.of('environmental:giant_lily_pad', 1),
		[
			'AAA',
			'AAA',
			'AAB'
		],
		{
			A: 'minecraft:lily_pad',
			B: 'fertilization:compressed_bonemeal'
		}
	)
	
	let jelly_torches = (output, dyeInput) => {
		event.shaped(output, [
			'DP',
			'SR'
		], {
			D: dyeInput,
			P: 'minecraft:prismarine_crystals',
			S: 'minecraft:slime_ball',
			R: 'upgrade_aquatic:prismarine_rod'
			
		})
	}
		jelly_torches('upgrade_aquatic:pink_jelly_torch', 'minecraft:pink_dye')
		jelly_torches('upgrade_aquatic:purple_jelly_torch', 'minecraft:purple_dye')
		jelly_torches('upgrade_aquatic:blue_jelly_torch', 'minecraft:blue_dye')
		jelly_torches('upgrade_aquatic:green_jelly_torch', 'minecraft:green_dye')
		jelly_torches('upgrade_aquatic:yellow_jelly_torch', 'minecraft:yellow_dye')
		jelly_torches('upgrade_aquatic:orange_jelly_torch', 'minecraft:orange_dye')
		jelly_torches('upgrade_aquatic:red_jelly_torch', 'minecraft:red_dye')
		jelly_torches('upgrade_aquatic:white_jelly_torch', 'minecraft:white_dye')

	
	event.remove({output: 'apotheosis:ender_lead'})
	event.shaped(
		Item.of('apotheosis:ender_lead', 1),
		[
			'AB ',
			'CD '
		],
		{
			A: 'minecraft:ender_eye',
			B: 'minecraft:lead',
			C: 'minecraft:gold_block',
			D: 'minecraft:nether_star'
		}
	)

	event.smelting('supplementaries:ash', 'minecraft:stick').xp(0.01).cookingTime(40)
	

	// I'm so funny
	event.shaped(
		Item.of('delightful:mini_melon'),
		[
			' A ',
			'ABA',
			' A '
		],
		{
			A: 'minecraft:piston',
			B: 'minecraft:melon'
		}
	).keepIngredient('minecraft:piston')

	event.blasting('minecraft:quartz_block', 'byg:quartzite_sand').xp(0.2)

	event.smelting('3x trafficcraft:raw_bitumen', 'minecraft:coal').xp(0.05).cookingTime(100)

	event.shaped(
		Item.of('kubejs:claim_inspector', 1),
		[
			'AB ',
			'CC '
		],
		{
			A: 'minecraft:ink_sac',
			B: 'minecraft:paper',
			C: 'minecraft:stick'
		}
	)


	event.shapeless(
		Item.of('kubejs:claim_tool', 1),
		[
			'minecraft:ink_sac',
			'minecraft:paper',
			'minecraft:red_candle',
			'minecraft:flint_and_steel'
		]
	).keepIngredient('minecraft:flint_and_steel')


	event.shaped(
		Item.of('architects_palette:hazard_sign', 4),
		[
			' A ',
			'AAA'
		],
		{
			A: 'minecraft:iron_ingot'
		}
	)

	
	event.shaped(
		Item.of('ironchest:copper_chest', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: '#forge:chests',
			B: 'minecraft:iron_ingot',
			C: 'minecraft:copper_block'
		}
	)
	event.shaped(
		Item.of('ironchest:wood_to_copper_chest_upgrade', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'minecraft:diamond',
			B: 'minecraft:iron_ingot',
			C: 'minecraft:copper_block'
		}
	)

	event.shaped(
		Item.of('ironchest:iron_chest', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: '#forge:chests',
			B: 'minecraft:gold_ingot',
			C: 'minecraft:iron_block'
		}
	)
	event.shaped(
		Item.of('ironchest:wood_to_iron_chest_upgrade', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'minecraft:diamond',
			B: 'minecraft:gold_ingot',
			C: 'minecraft:iron_block'
		}
	)
	event.shaped(
		Item.of('ironchest:copper_to_iron_chest_upgrade', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'minecraft:diamond',
			B: 'minecraft:copper_ingot',
			C: 'minecraft:iron_block'
		}
	)

	event.shaped(
		Item.of('ironchest:gold_chest', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'ironchest:iron_chest',
			B: 'minecraft:diamond',
			C: 'minecraft:gold_block'
		}
	)
	event.shaped(
		Item.of('ironchest:iron_to_gold_chest_upgrade', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'minecraft:diamond',
			B: 'minecraft:diamond',
			C: 'minecraft:gold_block'
		}
	)

	event.shaped(
		Item.of('ironchest:diamond_chest', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'ironchest:gold_chest',
			B: 'minecraft:netherite_ingot',
			C: 'minecraft:diamond_block'
		}
	)
	event.shaped(
		Item.of('ironchest:gold_to_diamond_chest_upgrade', 1),
		[
			'CBC',
			'BAB',
			'CBC'
		],
		{
			A: 'minecraft:diamond',
			B: 'minecraft:netherite_ingot',
			C: 'minecraft:diamond_block'
		}
	)

	let trappedIronChest = (chest, output) => {
		event.shapeless(
			Item.of(output, 1),
			[
				chest,
				'minecraft:tripwire_hook'
			]
		)
	}
	trappedIronChest('ironchest:copper_chest', 'ironchest:trapped_copper_chest')
	trappedIronChest('ironchest:iron_chest', 'ironchest:trapped_iron_chest')
	trappedIronChest('ironchest:gold_chest', 'ironchest:trapped_gold_chest')
	trappedIronChest('ironchest:diamond_chest', 'ironchest:trapped_diamond_chest')

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.