import { Rules } from "./game"

export type CreateRoomCmd = {
    type: 'createRoomCmd'
    clientId: string
}

export type JoinRoomCmd = {
    type: 'joinRoomCmd'
    name: string
    roomCode: string
}

export type LobbyReadyCmd = {
    type: 'lobbyReadyCmd'
    isReady: boolean
}

export type UpdateRulingCmd = {
    type: 'updateRulingCmd'
    clientId: string
    rules: Rules
}

export type PlayCardCmd = {
    type: 'playCardCmd'
    cardId: string
    clientId: string
}

export type DrawCardCmd = {
    type: 'drawCardCmd'
    cliendId: string
}

export type turnPassCmd = {
    type: 'turnPassCmd'
    clientId: string
}

