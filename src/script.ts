import { secretRoomItem } from "./secretRoomItem";

export const title = "Waterwheel Quest";

export const init =
  "village attic_pan sam_hungry cave_treasure well_bottom_magnet lamp_broken waterwheel_broken waterwheel_stall_key hidden_market_stall_coil";

export default `
waterwheel waterwheel_broken : waterwheel waterwheel_broken
The waterwheel is broken.

village waterwheel_broken
The villagers are murmuring about the water situation.

${
  secretRoomItem({
    place1: "waterwheel",
    place1_object_key: "waterwheel_stall_key",
    object: "axle",
    secret_room_item: "hidden_market_stall_coil",
    place2: "market",
    key: "stall_key",
    item: "coil",
    npc: "Jerry",
    secret_room: "hidden_market_stall",
  })[1]
}

blacksmith : blacksmith
You are at the blacksmith's shop.

blacksmith waterwheel_broken : blacksmith waterwheel_broken
The blacksmith seems worried.

Talk to blacksmith
blacksmith : blacksmith talk

blacksmith talk waterwheel_broken : blacksmith
The blacksmith tells you that the water wheel stopped working. No power getting to his shop.

blacksmith talk : blacksmith
The blacksmith explains how he came to work here.

Go to village
blacksmith : village



village : village
You are in the village center. You see villagers around.

village lamp_broken
Some villagers fiddle with the electric street lamp. They discuss why it's not working.

Insert coil into street lamp
village lamp_broken coil : village lamp_fixed
You connect the coil to the lamp. The lamp flickers and glows brightly. The villagers thank you profusely and nearly shake your hand off.

village lamp_fixed
The villagers stare dreamily into the bright_street_light.

Talk to villager
village lamp_fixed
The villager mentions seeing a suspicious figure near the waterwheel last night.

Go to blacksmith
village : blacksmith

Go to well
village : well




well : well
You are by the well. It looks deep and dark.

Go down the well using the bucket
well : well_bottom

well_bottom : well_bottom
You are at the bottom of the well. It's dark and damp.

well_bottom well_bottom_magnet : well_bottom well_bottom_magnet
You see a faint glimmer.

Take magnet
well_bottom well_bottom_magnet : well_bottom magnet
You find a magnet and a piece of cloth stuck to it. The cloth has a strange emblem on it.

Go back up using the bucket
well_bottom : well

Go to village
well : village

Go to waterwheel
well : waterwheel



Install magnet on waterwheel
waterwheel waterwheel_broken magnet : waterwheel waterwheel_fixed village_thanks
You use the magnet to fix the water wheel.

waterwheel waterwheel_fixed
The waterwheel_turns and creaks. Water splashes on to the cobblestone. The moonlight sparkles in the water droplets.

Go to well
waterwheel : well



village waterwheel_fixed : village waterwheel_fixed
The villagers are happy and greet you warmly.

village village_thanks : village
The villagers thank you for fixing the water wheel.

village waterwheel_broken : village waterwheel_broken
The villagers are grumpy and ignore you.

Go to market
village waterwheel_broken : village waterwheel_broken
The villagers are arguing with each other and block the way.

Go to market
village waterwheel_fixed : market waterwheel_fixed

Go to village
market : village

market
You find yourself amidst the hustle and bustle of the local_night_market. Vendors call out their wares, and colorful stalls line the narrow streets. Everyone has candles and lamps on their tables. The moon casts rays of light.

market
The market is very busy today. People are carrying water in buckets on their shoulders.



Go to garden
house : garden

Pick apple
garden : garden apple

Return to house
garden : house

Go to kitchen
house : kitchen

Make a sandwich
kitchen bread : kitchen sandwich

Return to house
kitchen : house

Go to bedroom
house : bedroom

bedroom : bedroom
You are in the bedroom. Sam is in the bed.

Sam is hungry.
bedroom sam_hungry : bedroom sam_hungry

Sam is happy.
bedroom sam_happy : bedroom sam_happy

Give sandwich to Sam
bedroom sam_hungry sandwich : bedroom sam_happy

Return to house
bedroom : house

Go to forest
garden : forest

Pick mushroom
forest : forest mushroom

Return to garden
forest : garden

Make mushroom soup
kitchen mushroom : kitchen soup

Go to living room
house : living_room

Sleep on couch
living_room : living_room sleep

sleep sam_happy : sam_hungry
You fall asleep, and wake up from someone calling.

sleep sam_hungry : sam_hungry
You fall asleep, and wake up from someone calling.

living_room : living_room
You are in the living room. The TV is on.

Return to house
living_room : house

Go to bathroom
house : bathroom

bathroom : bathroom
You are in the bathroom. The sink is leaking.

Return to house
bathroom : house

Go to garage
house : garage

Check the car
garage : garage_car

garage_car : garage
The car needs fuel.

Return to house
garage : house

Go to attic
house : attic

attic : attic
You are in the attic. There are old boxes here.

Return to house
attic : house

house
You are in a small_old_house. An old persian carpet lines the flagstone floor. A dusty staircase winds up and down. There are creaky noises. The moon peaks through the open window.

Pick flower
garden : garden flower

Make tea
kitchen : kitchen tea

Go to living room
kitchen : living_room

Drink tea
tea :

Go to cave
forest : cave

cave : cave
You are in the cave. It's dark inside.

Use torch
cave : cave_light

cave_light : cave_light
You are in the cave. It is lit by the torch.

Return to forest
cave_light : forest

Return to forest
cave : forest

Go to lake
forest : lake

Catch fish
lake : lake fish

Return to forest
lake : forest

Take pan from attic
attic attic_pan : attic pan

Cook fish in pan
kitchen pan fish : kitchen pan cooked_fish

Give cooked fish to Sam
bedroom cooked_fish sam_hungry : bedroom sam_happy

Go to rooftop
house : rooftop

rooftop
You are on the open_rooftop of a small house. The view of the city in the distance is breathtaking.

Stargaze
rooftop : rooftop_stargaze

You see a comet.
rooftop_stargaze : rooftop

Return to house
rooftop : house

Go to market
garden : market

Buy bread
market : market bread
After browsing for a while, you settle on a loaf of freshly baked bread from a nearby baker. The aroma is irresistible.

Go to garden
market : garden
You make your way back home, the sounds of the market gradually fading behind you.

Go to library
house : library
You step into the quiet sanctuary of the library, shelves towering high with books of every size and color. The air smells of old parchment and wisdom.

Find ancient book
library : library book_ancient
Your search leads you to a dusty corner where a tome bound in weathered leather catches your eye. Its title is written in faded gold letters, hinting at untold secrets.

Return to house
library : house

Go to mountain
forest : mountain
You embark on a journey towards the towering mountain peaks, their majesty looming in the distance like ancient guardians of the land.

Climb to the top
mountain : mountain_top
With each step, the air grows thinner, and the path steeper. But your determination drives you onward, towards the summit where mysteries await.

Discover hidden cave
mountain_top : cave_hidden
At the mountain's zenith, you stumble upon a concealed entrance to a cavern, hidden from the world below. Darkness envelops you as you step inside.

Explore the cave
cave_hidden : cave_hidden_explored
Your footsteps echo against the rocky walls as you venture deeper into the unknown, guided only by the dim light filtering through the cavern's depths.

Return to forest
cave_hidden_explored : forest
You emerge from the depths of the cave.

Find a treasure chest
cave_hidden_explored cave_treasure : cave_hidden_treasure
Amidst the shadows, your gaze lands upon a glimmering chest, adorned with intricate carvings and ancient runes. Could this be the legendary treasure you've heard whispers of?

Return to forest
cave_hidden_treasure cave_treasure : forest treasure
With the treasure in hand, you emerge from the depths of the cave, ready to continue your journey amidst the verdant embrace of the forest.

Go to meadow
forest : meadow
You find yourself in a tranquil meadow, bathed in the golden light of the sun. Wildflowers sway gently in the breeze, painting the landscape with vibrant hues.

Pick wildflowers
meadow : meadow flowers_wild
Amongst the sea of blossoms, you carefully select a handful of the most exquisite wildflowers, their petals soft against your fingertips.

Return to forest
meadow : forest
You bid farewell to the meadow, returning to the sheltering embrace of the forest's ancient trees.

Go to abandoned house
forest : abandoned_house

Search for clues
abandoned_house : abandoned_house_clues

Find a mysterious journal
abandoned_house_clues : abandoned_house_journal

Read the journal
abandoned_house_journal : abandoned_house_journal_read

Return to forest
abandoned_house_journal_read : forest

Go to river
forest : river

Build a raft
river : river_raft

Navigate downstream
river_raft : river_downstream

Discover a hidden island
river_downstream : island_hidden

Explore the island
island_hidden : island_hidden_explored

Uncover buried treasure
island_hidden_explored : island_treasure

Return to forest
island_treasure : forest

Go to hilltop
forest : hilltop

Spot a mysterious figure
hilltop : hilltop_figure

Approach the figure
hilltop_figure : hilltop_figure_approached

Engage in conversation
hilltop_figure_approached : hilltop_conversation

Receive a riddle
hilltop_conversation : hilltop_riddle

Solve the riddle
hilltop_riddle : forest
You solved the riddle.
`;
