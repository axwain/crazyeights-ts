import type WebSocket from "ws"
import type { Room } from '../core/room'
import type { Player } from "./game"
import { Commands } from "../net/commandTypes"
import { Messages } from "../net/messageTypes"

export type NetData = {
    type: string
}

export type CommandData = {
    type: Commands
}

export type MessageData = {
    type: Messages
}

type ClientId = string
type PlayerId = string
type RoomId = string

export type ClientPlayerMap = Map<ClientId, Player>

export type PlayerRoomMap = Map<PlayerId, Room>

export type RoomMap = Map<RoomId, Room>

export type RoomWebSocketMap = Map<string, WebSocket>

