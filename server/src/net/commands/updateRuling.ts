import type { UpdateRulingCmd } from '../../@types/commands'
import type { Player } from '../../@types/game'
import type { ClientPlayerMap, PlayerRoomMap } from '../../@types/net'

type UpdateRulingArgs = {
    clientPlayerMap: ClientPlayerMap
    playerRoomMap: PlayerRoomMap
    command: UpdateRulingCmd
}

export const updateRuling = ({
    clientPlayerMap,
    playerRoomMap,
    command
}: UpdateRulingArgs) => {
    if (clientPlayerMap.has(command.clientId)) {
        const player = clientPlayerMap.get(command.clientId) as Player
        const room = playerRoomMap.get(player.id)
        if (room) {
            room.updateRuling(command.rules)
            return room
        }
    }
    return null
}

