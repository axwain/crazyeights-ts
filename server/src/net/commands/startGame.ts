import type { GameStartCmd } from '../../@types/commands'
import type { Player } from '../../@types/game'
import type { ClientPlayerMap, PlayerRoomMap } from '../../@types/net'

type StartGameArgs = {
    clientPlayerMap: ClientPlayerMap
    playerRoomMap: PlayerRoomMap
    command: GameStartCmd
}

export const startGame = ({
    clientPlayerMap,
    playerRoomMap,
    command
}: StartGameArgs) => {
    if (clientPlayerMap.has(command.clientId)) {
        const player = clientPlayerMap.get(command.clientId) as Player
        const room = playerRoomMap.get(player.id)
        if (room && room.isOwner(player) && room.canStartGame()) {
            room.startGame()
            return room
        }
    }
    return null
}