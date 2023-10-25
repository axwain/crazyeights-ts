import type { Rules, Suit } from "./game"

export type CreateRoomCmd = {
    type: 'createRoomCmd'
    clientId: string
    playerName: string
}

export type JoinRoomCmd = {
    type: 'joinRoomCmd'
    clientId: string
    name: string
    roomCode: string
}

export type LobbyReadyCmd = {
    type: 'lobbyReadyCmd'
    clientId: string
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

export type selectSuitCmd = {
    type: 'selectSuitCmd'
    clientId: string
    suit: Suit
}

