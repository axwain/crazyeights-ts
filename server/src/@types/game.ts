export type Rules = {
    handSwitch: boolean
    handRotation: boolean
    turnJump: boolean
    stackDrawCard: boolean
    stackWildDraw: boolean
    drawToMatch: boolean
    wildFinish: boolean
}

export type Player = {
    name: string
    id: string
}

export enum Suit {
    spade = 1,
    club = 2,
    heart = 3,
    diamond = 4,
    star = 5,
    wild = 10
}

export type Card = {
    readonly suit: Suit
    readonly value: number
}

export type Deck = Card[]

export type PlayerHand = Map<string, Card>

export type PlayerGroup = Map<string, PlayerHand>

