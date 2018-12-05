const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage', {
        from:'Nicholas',
        text: 'Hey babe, sn',
        createdAt: 193423
    })

    socket.on('createMessage', (messageData) => {
        console.log('Message data',messageData)
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server start on ${port}!`)
})