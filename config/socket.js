const { Server } = require("socket.io");

// Change client URL as necessary
// const URL = `http://localhost:3001`;

// deployment url
const URL = 'golden-semifreddo-f14d90.netlify.app'

// create our backend socket utility and return the socket info and the server info
const socketConnection = (app) => {
  const http = require("http");
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: URL,
    },
  });
  return { io, server };
};

module.exports = socketConnection;
