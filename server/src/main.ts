import { WebSocketServer } from 'ws'
import { v4 as uuidV4 } from 'uuid'
import type { CreateRoomCmd } from './@types/commands'
import type { RegisteredMsg, RoomCreatedMsg } from './@types/messages'
import type { NetData } from './@types/net'
import { Commands } from './net/commands'
import { codeGen } from './utils/codeGen'

console.log('Starting server...')
const server = new WebSocketServer({
    host: '0.0.0.0',
    port: 9010,
    clientTracking: true // remove when rooms are implemented
})

const address = `${server.options.host}:${server.options.port}`
console.log(`Server listening on: ${address}`)

const idMap = new Map<string, string>()
const playerRoomMap = new Map<string, string>()

server.on('connection', (ws, request) => {
    console.log(`Connected from origin: ${request.headers.origin}`)
    ws.on('error', console.error)

    ws.on('message', (data, isBinary) => {
        if (isBinary) {
            console.log('invalid data')
            return
        }
        console.log(data.toString())
        try {
            const request = JSON.parse(data.toString()) as NetData
            if (request.type === Commands.create) {
                const command = request as CreateRoomCmd
                const isPlayerInRoom = playerRoomMap.has(command.clientId)
                if (!isPlayerInRoom) {
                    const message: RoomCreatedMsg = {
                        type: 'roomCreated',
                        roomId: codeGen()
                    }
                    playerRoomMap.set(command.clientId, message.roomId)
                    ws.send(JSON.stringify(message))
                    return
                }
            }
        } catch (e) {
            console.error('invalid data', e)
            ws.send(JSON.stringify({ type: 'error' }))
        }
    })

    const clientId = uuidV4()
    const playerId = uuidV4()
    idMap.set(clientId, playerId)
    const message: RegisteredMsg = {
        type: 'registered',
        clientId,
        playerId
    }

    ws.send(JSON.stringify(message))
    console.log(`Registered ${clientId}`)
})

console.log('Waiting for connections...')

