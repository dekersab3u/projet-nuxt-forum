import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 4000 })

const clients = new Set<WebSocket>()

wss.on('connection', (ws) => {
    clients.add(ws)
    ws.on('close', () => clients.delete(ws))
})

export const broadcast = (type: string, data: any) => {
    const payload = JSON.stringify({ type, data })
    for (const client of clients) {
        client.send(payload)
    }
}
