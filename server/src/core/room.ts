import type { Player, Rules } from '../@types/game';

enum State {
    lobby,
    match,
    results
}

export class Room {
    id: string
    owner: Player
    players: Set<Player>
    ruling: Rules
    state: State

    constructor(id: string, roomOwner: Player) {
        this.id = id
        this.players = new Set<Player>()
        this.players.add(roomOwner)
        this.owner = roomOwner
        this.ruling = {
            handSwitch: false,
            handRotation: false,
            turnJump: false,
            stackDrawCard: true,
            stackWildDraw: false,
            drawToMatch: false,
            wildFinish: true,
        }
        this.state = State.lobby
    }

    canStartGame() {
        return this.players.size > 1 && this.state !== State.match
    }

    canPlayerJoin() {
        return this.players.size < 6 && this.state === State.lobby
    }

    // do not allocate new memory
    updateRuling(updatedRuling: Rules) {
        this.ruling.handSwitch = updatedRuling.handSwitch
        this.ruling.handRotation = updatedRuling.handRotation
        this.ruling.turnJump = updatedRuling.turnJump
        this.ruling.stackDrawCard = updatedRuling.stackDrawCard
        this.ruling.stackWildDraw = updatedRuling.stackWildDraw
        this.ruling.drawToMatch = updatedRuling.drawToMatch
        this.ruling.wildFinish = updatedRuling.wildFinish
    }

    addPlayer(player: Player) {
        if (this.canPlayerJoin()) {
            this.players.add(player)
            return true
        }
        return false
    }

    removePlayer(player: Player) {
        if (this.players.has(player)) {
            this.players.delete(player)
            return true
        }
        return false
    }

    hasPlayers() {
        return this.players.size > 0
    }

    getPlayers() {
        return this.players
    }

    getRuling() {
        return this.ruling
    }

    isOwner(player: Player) {
        return player.id === this.owner.id
    }

    startGame() {
        this.state = State.match
    }

    endGame() {
        this.state = State.results
    }

    setToLobby() {
        this.state = State.lobby
    }
}
