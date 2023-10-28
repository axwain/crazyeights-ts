import { Messages } from '../net/messageTypes'
import type { Card, Player, Rules, Suit } from './game'

export type RegisteredMsg = {
    type: Messages.registered
    clientId: string
    playerId: string
}

export type RoomCreatedMsg = {
    type: Messages.roomCreated
    roomId: string
}

export type LobbyPlayer = Player & {
    isReady: string
}

export type JoinedRoomMsg = {
    type: Messages.joinedRoom
    rules: Rules
    players: LobbyPlayer[]
}

export type PlayerJoinedMsg = {
    type: Messages.playerJoined
    player: Player
}

export type PlayerUpdatedMsg = {
    type: Messages.playerUpdated
    player: LobbyPlayer
}

export type RulingUpdatedMsg = {
    type: Messages.rulingUpdated
    rules: Rules
}

export type IndexedCard = Card & { cardId: string }

export type PlayerHandObj = {
    playerId: string
    cards: IndexedCard
}

export type MatchStartingMsg = {
    type: Messages.matchStarting
    rules: Rules
    hand: PlayerHandObj[]
    firstCard: Card
    firstPlayerId: string
}

export type CardPlayedMsg = {
    type: Messages.cardPlayed
    card: Card
    nextPlayerId: string
}

export type GameEndedMsg = {
    type: Messages.gameEnded
    winnerId: string
}

export type DrawCardsMsg = {
    type: Messages.drawCards
    cards: Card[]
}

export type PlayerDrawnCardsMsg = {
    type: Messages.playerDrawnCards
    playerId: string
    total: number
}

export type SelectedSuitMsg = {
    type: Messages.selectedSuit
    suit: Suit
}

export type HandChanged = {
    type: Messages.handChanged
    cards: IndexedCard[]
}
