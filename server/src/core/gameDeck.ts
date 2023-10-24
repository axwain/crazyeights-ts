import type { Card, Deck } from '../@types/game'
import { shuffleArray } from '../utils/shuffleArray'
import { buildDeck } from './buildDeck'

export class GameDeck {
    deck: Deck
    discardPile: Card[]

    constructor(totalPlayers: number) {
        this.deck = buildDeck(totalPlayers)
        this.discardPile = []

        shuffleArray(this.deck)
    }

    drawCard() {
        if (this.deck.length === 0) {
            this.deck.push(...this.discardPile)
            shuffleArray(this.deck)
        }

        return this.deck.pop() as Card
    }

    discard(card: Card) {
        this.discardPile.push(card)
    }
}

