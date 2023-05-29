const { Server } = require("socket.io")
const URL = `http://localhost:3001`

const socketConnection = (server) =>{

    const io = new Server(server, {
        cors: {
            origin: URL
        }
    })
    return io
}

module.exports = socketConnection