import { type Card, Suit } from '../@types/game'

export class TableCard {
    suit: Suit
    value: number
    exactCard: Card

    constructor() {
        this.suit = Suit.wild
        this.value = -1
    }

    setCard(card: Card) {
        this.suit = card.suit
        this.value = card.value
        this.exactCard = {
            suit: this.suit,
            value: this.value
        }
    }

    /**
     * when a wild / crazy card is played, it can select a different suit
     * which results in a non-existent card
     *  */
    setSuit(suit: Suit) {
        this.suit = suit
    }

    canPlay(card: Card) {
        return (
            card.suit === Suit.wild ||
            card.suit === this.suit ||
            card.value === this.value
        )
    }

    isExactCard(card: Card) {
        return this.exactCard.suit === card.suit &&
            this.exactCard.value === card.value
    }

    getExactCard() {
        return this.exactCard
    }
}
