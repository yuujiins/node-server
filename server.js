import {Server} from "socket.io"

const io = new Server(3000)

io.on('connection', (socket) => {
    console.log('A user has connected')

    socket.emit('Welcome', 'Hi User!')

    socket.on('test-server', (message) => {
        console.log(message)
    })
})