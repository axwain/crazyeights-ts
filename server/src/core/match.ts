import { v4 } from 'uuid'
import {
    Suit,
    type Card,
    type PlayerGroup,
    type PlayerHand,
    type Rules } from '../@types/game';
import { shuffleArray } from '../utils/shuffleArray';
import { GameDeck } from './gameDeck';
import { Room } from './room';
import { TableCard } from './tableCard';
import { IndexedCard } from '../@types/messages';

const INITIAL_CARD_COUNT = 7

enum TurnDirection {
    clockwise = 1,
    counterClockwise = -1
}

export class Match {
    gameDeck: GameDeck
    tableCard: TableCard
    group: PlayerGroup
    rules: Rules
    turnOrder: string[]
    currentTurn: number
    turnDirection: TurnDirection

    constructor(room: Room) {
        const players = room.getPlayers()
        this.gameDeck = new GameDeck(players.size)
        this.tableCard = new TableCard()
        this.group = new Map<string, PlayerHand>()
        this.rules = room.getRuling()
        this.turnOrder = []
        this.currentTurn = 0
        this.turnDirection = TurnDirection.clockwise

        const playerArray = Array.from(players.values())
        shuffleArray(playerArray)

        playerArray.forEach((player) => {
            const playerHand = new Map<string, Card>()
            for (let i = 0; i < INITIAL_CARD_COUNT; i++) {
                playerHand.set(v4(), this.gameDeck.drawCard())
            }
            this.group.set(player.id, playerHand)
            this.turnOrder.push(player.id)
        })

        const firstCard = this.gameDeck.drawCard()
        this.gameDeck.discard(firstCard)
        this.tableCard.setCard(firstCard)
    }

    getLastCard() {
        return this.tableCard.getExactCard()
    }

    hasPlayer(playerId: string) {
        return this.group.has(playerId)
    }

    getPlayerHand(playerId: string): IndexedCard[] {
        if (this.hasPlayer(playerId)) {
            const playerHand = this.group.get(playerId) as PlayerHand
            return Array.from(playerHand, ([cardId, card]) => {
                return {
                    cardId,
                    ...card
                }
            })
        }

        return []
    }

    getCurrentTurn() {
        return this.turnOrder[this.currentTurn]
    }

    clampTurn() {
        const indexModulo = Math.abs(this.currentTurn) % this.turnOrder.length
        if (this.currentTurn < 0) {
            this.currentTurn = this.turnOrder.length - indexModulo
        } else {
            this.currentTurn = indexModulo
        }
    }

    setTurnAfter(playerId: string) {
        const turnIndex = this.turnOrder.indexOf(playerId)
        if (turnIndex > -1) {
            this.currentTurn += this.turnDirection as number
        }
    }

    jumpTurns(totalJumps: number) {
        this.currentTurn += totalJumps
        this.clampTurn()
    }

    toggleTurnDirection() {
        this.turnDirection = (-1 * this.turnDirection) as TurnDirection
    }

    isPlayerTurn(playerId: string) {
        return playerId === this.getCurrentTurn()
    }

    canPlay(playerId: string, card: Card) {
        return this.isPlayerTurn(playerId) && this.tableCard.canPlay(card)
    }

    canTurnJump(card: Card) {
        return this.rules.turnJump && this.tableCard.isExactCard(card)
    }

    canPlayLastWild(card: Card, hand: PlayerHand) {
        return hand.size === 1 && card.suit === Suit.wild && this.rules.wildFinish
    }

    playCard(playerId: string, cardId: string) {
        if (this.hasPlayer(playerId)) {
            const hand = this.group.get(playerId) as PlayerHand
            if (hand.has(cardId)) {
                const card = hand.get(cardId) as Card
                if ((this.canPlay(playerId, card) || this.canTurnJump(card)) &&
                    this.canPlayLastWild(card, hand)) {
                    hand.delete(cardId)
                    return card
                }
            }
        }

        return null
    }
}