const { Server } = require("socket.io")
const URL = `http://localhost:3001`

const socketConnection = (app) =>{

    const http = require("http");
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: URL
        }
    })
    return {io, server}
}

module.exports = socketConnection