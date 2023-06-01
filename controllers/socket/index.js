const useSocket = (io, socket) => {
    console.log("socket:", socket.id);
  
    const sayHi = require("./sayHi");
    socket.on("Hi", sayHi);

    socket.emit('hi')

    const handleMessage = require('./handleMessage')
    socket.on("message", (data) => handleMessage(data, io))

    const joinRoom = require('./joinRoom')
    socket.on('join-room', (data) => joinRoom(data, socket))
    
}

module.exports = useSocket