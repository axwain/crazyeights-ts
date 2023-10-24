import { type Card, Suit } from '../@types/game'

export class TableCard {
    suit: Suit
    value: number

    constructor() {
        this.suit = Suit.wild
        this.value = -1
    }

    canPlay(card: Card) {
        return (
            card.suit === Suit.wild ||
            card.suit === this.suit ||
            card.value === this.value
        )
    }

    setCard(card: Card) {
        this.suit = card.suit
        this.value = card.value
    }

    setSuit(suit: Suit) {
        this.suit = suit
    }
}

