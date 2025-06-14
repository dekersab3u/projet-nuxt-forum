export default defineNuxtPlugin(() => {
    const socket = new WebSocket('ws://localhost:4000')

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'new-message') {
            console.log('Nouveau message !', message.data)
        }
    }

    return {
        provide: {
            socket,
        },
    }
})
