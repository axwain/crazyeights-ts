import type { JoinRoomCmd } from '../../@types/commands'
import type { Player } from '../../@types/game'
import type { ClientPlayerMap, PlayerRoomMap, RoomMap } from '../../@types/net'
import { isPlayerInARoom } from './isPlayerInARoom'

type JoinRoomArgs = {
    clientPlayerMap: ClientPlayerMap
    playerRoomMap: PlayerRoomMap
    roomMap: RoomMap
    command: JoinRoomCmd
}

const validateAndGetPlayer = ({
    clientPlayerMap,
    playerRoomMap,
    command
}: JoinRoomArgs) => {
    if (clientPlayerMap.has(command.clientId)) {
        const player = clientPlayerMap.get(command.clientId) as Player
        if (!isPlayerInARoom(player, playerRoomMap)) {
            return player
        }
    }
    return null
}

const validateAndGetRoom = ({ roomMap, command }: JoinRoomArgs) => {
    return roomMap.get(command.roomCode) || null
}

export const joinRoom = (args: JoinRoomArgs) => {
    const { playerRoomMap, command } = args
    const player = validateAndGetPlayer(args)
    const room = validateAndGetRoom(args)
    if (player && room) {
        player.name = command.playerName
        playerRoomMap.set(player.id, room)
        return player
    }
    return null
}

