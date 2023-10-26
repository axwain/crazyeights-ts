import WebSocket from "ws"
import { MessageData } from "../@types/net"

export const sendMessage = <T extends MessageData>(
    message: T,
    ws: WebSocket
) => ws.send(JSON.stringify(message))

