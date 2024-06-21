//const $EntityDamageSource = Java.loadClass(`net.minecraft.world.damagesource.EntityDamageSource`);


 
StartupEvents.registry('mob_effect', event => {
    event.create('flagged')
        .color(0xcd4a47)
        .harmful();

    event.create('deserter')
        .color(0x62ffff)
        .modifyAttribute('minecraft:generic.movement_speed', '350cdda1-dff0-4efe-a005-73cecb1b45c9', -0.2, "multiply_total")
        .modifyAttribute('minecraft:generic.max_health', '6d0e5dda-5694-46e9-bed8-0daff776f112', -0.5, "multiply_total")
        .modifyAttribute('minecraft:generic.attack_damage', '6f0da2de-3628-4bf5-ac35-53a2c4b3253b', -0.5, "multiply_total")
        .harmful();

    event.create('player_combat')
        .color(0x7e0c0c)
        .harmful();    

    event.create('princess')
        .color(0xe7edee)
        .beneficial();

    event.create('homebound')
        .color(0x7e6237)
        .beneficial();

    event.create('sanctuary')
        .color(0xe5debe)
        .beneficial();

    event.create('ominous_presence')
        .color(0x0f0801)
        .modifyAttribute('minecraft:generic.armor', 'c09dcad2-3eb8-4424-b7f0-6f89ddd7d32b', -0.5, "multiply_total")
        .modifyAttribute('apotheosis:healing_received', 'd0848866-6950-446d-87e3-c26e6f727a12', -0.75, "multiply_total")
        .modifyAttribute('minecraft:generic.knockback_resistance', '1439f6a7-0e25-495b-9ac7-12af12deff98', -0.5, 'multiply_total')
        .modifyAttribute('minecraft:generic.attack_damage', 'a9987386-5d18-4b4f-80e5-b7ab59cde738', -0.5, "multiply_total")
        //.modifyAttribute('apotheosis:arrow_damage', 'f3beb4f1-a4a1-4f2b-b7f1-5ef0ecb1dceb', -0.5, "multiply_total")
        .harmful();

})


// VIRAL PUBLIC LICENSE
// Copyleft (ɔ) All Rights Reversed
// This WORK is hereby relinquished of all associated ownership, attribution and copy rights, 
// and redistribution or use of any kind, with or without modification, is permitted without restriction subject to the following conditions:
// 1. Redistributions of this WORK, or ANY work that makes use of ANY of the contents of this WORK by ANY kind of copying, dependency, linkage, 
// or ANY other possible form of DERIVATION or COMBINATION, must retain the ENTIRETY of this license.
// 2. No further restrictions of ANY kind may be applied.
