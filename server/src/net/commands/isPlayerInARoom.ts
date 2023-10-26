import { Player } from "../../@types/game";
import { PlayerRoomMap } from "../../@types/net";

export const isPlayerInARoom = (player: Player, map: PlayerRoomMap) => {
    return map.has(player.id)
}
