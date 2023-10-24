/**
 * 2 Players: 1 Deck of 4 Suits, 4 W, and 2 Jokers
 * 3 Players: 1 Deck of 5 Suits, 5 W, and 2 Jokers
 * 4 Players: 2 Decks of 4 Suits, 4 W, and 4 Jokers
 * 5-6 Players: 2 Decks of 5 Suits, 5 W, and 4 Jokers
 * 
 * W: 0
 * A: 1
 * 0 - 7: 2 - 9
 * J: 10
 * Q: 11
 * K: 12
 * Crazy Eight: 13
 * Joker: 14
 * */
import { type Deck, Suit } from '../@types/game'

const W_VALUE = 0;
const ACE_VALUE = 1;
const CRAZY_EIGHT_VALUE = 13;
const JOKER_VALUE = 14;

export function buildDeck(totalPlayers: number) {
    const deck: Deck = []
    const TOTAL_SUITS = totalPlayers === 3 || totalPlayers > 5 ? 5 : 4
    const TOTAL_DECKS = totalPlayers > 3  ? 2 : 1
    
    // add value cards
    for(let i = 0; i < TOTAL_DECKS; i++) {
        for(let j = 0; j < TOTAL_SUITS; j++) {
            for(let k = ACE_VALUE; k < CRAZY_EIGHT_VALUE; k++) {
                deck.push({ suit: j as Suit, value: k })
            }
        }
        // add W, 1 per suit
        for(let j = 0; j < TOTAL_SUITS; j++) {
            deck.push({ suit: j as Suit, value: W_VALUE })
        }
        // add Crazy Eights, 4 per deck
        for(let j = 0; j < 4; j++) {
            deck.push({ suit: Suit.wild, value: CRAZY_EIGHT_VALUE })
        }
        // add Jokers, 2 per deck
        for(let j = 0; j < 2; j++) {
            deck.push({ suit: Suit.wild, value: JOKER_VALUE })
        }
    }
    
    return deck
}

