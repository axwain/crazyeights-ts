import { Player } from '../../@types/game'
import { Room } from '../../core/room'
import { generateCode } from '../../utils/generateCode'

export const createRoom = (owner: Player) => {
    const roomId = generateCode()
    return new Room(roomId, owner)
}

