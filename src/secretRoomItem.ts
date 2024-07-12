import { randInt } from "./randInt";

`
Search waterwheel
waterwheel waterwheel_stall_key hidden_market_stall_coil : market stall_key coil
You discover stall_key hidden in waterwheel at waterwheel. You find a note left for Jerry. You go to market and find coil in hidden_market_stall.
`;

export const secretRoomItem = ({
  place1 = "",
  place1_object_key = "",
  object = "",
  secret_room_item = "",
  place2 = "",
  key = "",
  item = "",
  npc = "",
  secret_room = "",
  search_keyhole = "search_keyhole" + randInt(),
}) => [
  `
Search ${place1}
${place1} ${place1_object_key} ${secret_room_item} : ${place2} ${key} ${item}
You discover ${key} hidden in $object at ${place1}. You find a note left for ${npc}. You go to ${place2} and find ${item} in ${secret_room}.
`,
  `
${place1} ${place1_object_key} : ${place1} ${place1_object_key}
You notice a compartment on the side of the ${object}.

Open compartment
${place1} ${place1_object_key} : ${place1} ${key}
Inside the compartment, you find a ${key} and a note. The note reads: "Thanks ${npc}"

Search for keyhole
${place2} ${key} : ${search_keyhole} ${key}
You find a hidden keyhole.

Use ${key} on keyhole
${search_keyhole} ${key} : ${secret_room} ${key}

${secret_room}
You are in ${secret_room}. It's dimly lit and filled with junk and equipment.

${secret_room} ${secret_room_item}
On a shelf, you see ${item}.

Take ${item}
${secret_room} ${secret_room_item} : ${secret_room} ${item}
You take ${item}.

Go back
${secret_room} : ${place2}
`,
];
