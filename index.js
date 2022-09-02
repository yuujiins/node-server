
const {Server} = require('socket.io')

const io = new Server(3000)

io.on('connection', (socket) => {
  socket.emit('welcome', 'Hi user')

  socket.on('create-room', (roomId) => {
    socket.join(roomId)
    console.log(socket.rooms)
    socket.emit('create-status', 'success')
  })

  socket.on('join-room', (player) => {
    socket.to(player.roomID).emit('join-request', player)
  })

  socket.on('approve-join', (arg) => {
    if(arg.approved == true){
      socket.broadcast.emit('approved', arg)
    }
    else{
      socket.broadcast.emit('approved', {approved: false})
    }
  })

  socket.on('cell-clicked', (data) => {
    socket.to(data.room).emit('state-update', {state: data.state, value: data.value, mark: data.mark})
  })

  socket.on('leave-room', (roomId) => {
    console.log(`Room to leave: ${roomId}`)
    socket.to(roomId).emit('user-left', 'Your opponent left the room')
    socket.leave(roomId)
    console.log('Leaving room:', roomId)
    console.log(socket.rooms)
    socket.emit('welcome', 'room left')
  })
})