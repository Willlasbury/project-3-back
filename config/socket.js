const { Server } = require("socket.io");

// Change client URL as necessary
const URL = `http://localhost:3000`;

// deployment url
// const URL = 'https://traderz-post.netlify.app/'

// create our backend socket utility and return the socket info and the server info
const socketConnection = () => {
  const http = require("http");
  const server = http.createServer();

  const io = new Server(server, {
    cors: {
      origin: URL,
    },
  });
  return { io, server };
};

module.exports = socketConnection;
