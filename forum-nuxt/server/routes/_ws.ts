let peers: WebSocketPeer[] = []

export default defineWebSocketHandler({
    open(peer) {
        console.log("[ws] open", peer)
        peers.push(peer)
    },

    message(peer, message) {
        console.log("[ws] message", peer, message)
        if (message.text().includes("ping")) {
            peer.send("pong")
        }
    },

    close(peer) {
        console.log("[ws] close", peer)
        peers = peers.filter(p => p !== peer)
    },

    error(peer, error) {
        console.log("[ws] error", peer, error)
        peers = peers.filter(p => p !== peer)
    },
})

// Fonction exportable
export function broadcastMessageToAllClients(payload: any) {
    const message = JSON.stringify(payload)
    peers.forEach(peer => peer.send(message))
}
