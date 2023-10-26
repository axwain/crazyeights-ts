import type WebSocket from "ws"
import type { Room } from '../core/room'
import type { Player } from "./game"

export type NetData = {
    type: string
}

export type ClientPlayerMap = Map<string, Player>

export type PlayerRoomMap = Map<string, Room>

export type RoomWebSocketMap = Map<string, WebSocket>

