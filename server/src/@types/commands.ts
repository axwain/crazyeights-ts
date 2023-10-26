import { Commands } from "../net/commandTypes"
import type { Rules, Suit } from "./game"

export type CreateRoomCmd = {
    type: Commands.create
    clientId: string
    playerName: string
}

export type JoinRoomCmd = {
    type: Commands.join
    clientId: string
    playerName: string
    roomCode: string
}

export type SetReadyCmd = {
    type: Commands.ready
    clientId: string
    isReady: boolean
}

export type UpdateRulingCmd = {
    type: Commands.updateRuling
    clientId: string
    rules: Rules
}

export type PlayCardCmd = {
    type: Commands.playCard
    cardId: string
    clientId: string
}

export type DrawCardCmd = {
    type: Commands.drawCard
    cliendId: string
}

export type turnPassCmd = {
    type: Commands.pass
    clientId: string
}

export type selectSuitCmd = {
    type: Commands.selectSuit
    clientId: string
    suit: Suit
}

