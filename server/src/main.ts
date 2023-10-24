import { WebSocketServer } from 'ws'
import { v4 as uuidV4 } from 'uuid'

console.log('Starting server...')
const server = new WebSocketServer({
    host: '0.0.0.0',
    port: 9010,
    clientTracking: true // remove when rooms are implemented
})

const address = `${server.options.host}:${server.options.port}`
console.log(`Server listening on: ${address}`)

const idMap = new Map<string, string>()

server.on('connection', (ws, request) => {
    console.log(`Connected from origin: ${request.headers.origin}`)
    ws.on('error', console.error)

    ws.on('message', (data, isBinary) => {
        if (isBinary) {
            console.log('invalid data')
            return
        }
        console.log(data)
    })

    const clientId = uuidV4()
    const playerId = uuidV4()
    idMap.set(clientId, playerId)

    ws.send(JSON.stringify({ clientId, playerId }))
    console.log(`Registered ${clientId}`)
})

console.log('Waiting for connections...')

