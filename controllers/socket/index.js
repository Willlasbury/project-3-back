const users = {}
const getTokenInfo = require('../utils/getTokenInfo')

const useSocket = (io, socket) => {
  // console.log("socket:", socket.id);
  const handleMessage = require("./handleMessage");
  socket.on("message", (data) => handleMessage(data, io));

  // const joinRoom = require('./joinRoom')
  // socket.on('join-room', (data) => joinRoom(data, socket))

    socket.on("add_user", (data) => {
    const userInfo = getTokenInfo(data.token);
    users[userInfo.userId] = data.socket;
  });
};

module.exports = useSocket;
