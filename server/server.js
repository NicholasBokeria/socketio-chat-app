const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room are required')
        }

        socket.join(params.room)

        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))

        callback()
    })

    socket.on('createLocationMessage', coords => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)

        if (user) {
            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room))
            io.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} has left.`))
        }
    })
})

server.listen(port, () => {
    console.log(`Server start on ${port}!`)
})