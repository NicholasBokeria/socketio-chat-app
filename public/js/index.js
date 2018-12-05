let socket = io()

socket.on('connect', function () {
    console.log('Connected to server')

    socket.emit('createMessage', {
        to: 'Everyone',
        text: 'Heyllo guys!'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log(message)
})