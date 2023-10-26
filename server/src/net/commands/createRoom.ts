import { Player } from '../../@types/game'
import { Room } from '../../core/room'
import { generateCode } from '../../utils/generateCode'
import type { ClientPlayerMap, PlayerRoomMap, RoomMap } from '../../@types/net'
import type { CreateRoomCmd } from '../../@types/commands'
import { isPlayerInARoom } from './isPlayerInARoom'

type CreateRoomArgs = {
    clientPlayerMap: ClientPlayerMap
    playerRoomMap: PlayerRoomMap
    roomMap: RoomMap
    maxRooms: number
    command: CreateRoomCmd
}

const validateAndGetOwner = ({
    clientPlayerMap,
    command,
    maxRooms,
    playerRoomMap,
    roomMap
}: CreateRoomArgs) => {
    if (roomMap.size < maxRooms && clientPlayerMap.has(command.clientId)) {
        const player = clientPlayerMap.get(command.clientId) as Player
        if (!isPlayerInARoom(player, playerRoomMap)) {
            return player
        }
    }
    return null
}

export const createRoom = (args: CreateRoomArgs) => {
    const { command, playerRoomMap, roomMap } = args
    const owner = validateAndGetOwner(args)
    if (owner) {
        const roomId = generateCode()
        const room = new Room(roomId, owner)
        owner.name = command.playerName
        playerRoomMap.set(owner.id, room)
        roomMap.set(roomId, room)
        return room
    }
    return null
}

