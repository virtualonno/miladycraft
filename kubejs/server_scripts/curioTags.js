let excludedSimpleHats = new Set([
	"simplehats:hatbag_common",
	"simplehats:hatbag_uncommon",
	"simplehats:hatbag_rare",
	"simplehats:hatbag_epic",
	"simplehats:hatbag_easter",
	"simplehats:hatbag_summer",
	"simplehats:hatbag_halloween",
	"simplehats:hatbag_festive",
	"simplehats:hatscraps_common",
	"simplehats:hatscraps_uncommon",
	"simplehats:hatscraps_rare",
	"simplehats:hatscraps_epic",
	"simplehats:hatscraps_easter",
	"simplehats:hatscraps_summer",
	"simplehats:hatscraps_halloween",
	"simplehats:hatscraps_festive",
	"simplehats:haticon",
	"simplehats:hatdisplay"
])

ServerEvents.tags('item', event => {
	let hats = Ingredient.of("@simplehats").itemIds

	for(let hat of hats){
		if(excludedSimpleHats.has(`${hat}`)){continue}
		else{
			event.add('curios:cosmetic', [
				hat
			])
		}
	}



    // event.remove('curios:hands', [
    //     "kubejs:angel_wing_elytra",
    //     "artifacts:feral_claws"
    // ])
})