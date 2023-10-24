import type { Card, Player, Rules } from './game'

export type DataMsg = {
    type: string
}

export type ConnectMsg = {
    type: 'connect'
    clientId: string
    playerId: string
}

export type CreateRoomMsg = {
    type: 'createRoom'
    roomId: string
}

export type LobbyPlayer = Player & {
    isReady: string
}

export type JoinRoomMsg = {
    type: 'joinedRoom'
    rules: Rules
    players: LobbyPlayer[]
}

export type PlayerJoinedMsg = {
    type: 'playerJoined'
    player: Player
}

export type PlayerUpdatedMsg = {
    type:'playerUpdated'
    player: LobbyPlayer
}

export type RuleUpdatedMsg = {
    type: 'rulingUpdated'
    rules: Rules
}

export type StartGameMsg = {
    type: 'startGame'
}

type PlayerHand = {
    playerId: string
    cards: Card & {
        cardId: string
    }
}

export type TableSetupMsg = {
    rules: Rules
    hands: PlayerHand[]
    firstCard: Card
    firstPlayerId: string
}

export type PlayedCardMsg = {
    type: 'playedCard'
    card: Card
    nextPlayerId: string
}

export type GameEndedMsg = {
    type: 'gameEnded'
    winnerId: string
}

export type DrawCardMsg = {
    type: 'drawCard'
    cards: Card[]
}

export type PlayerDrawMsg = {
    type: 'playerDraw'
    playerId: string
    total: number
}

export type selectSuitMsg = {
    type: 'selectSuit'
}

