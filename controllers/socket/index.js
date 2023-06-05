const users = {};
const getTokenInfo = require("../utils/getTokenInfo");

const useSocket = (io, socket) => {
  // console.log("socket:", socket.id);
  const handleMessage = require("./handleMessage");
  socket.on("message", (data) => handleMessage(data, io));

  // const joinRoom = require('./joinRoom')
  // socket.on('join-room', (data) => joinRoom(data, socket))

  // add user to list of all users
  socket.on("add_user", data => {
    // console.log("data:", data)
    const userInfo = getTokenInfo(data);
    users[userInfo.userId] = data.socket;
  });

  // socket.on('send_bid', data =>
  //   console.log("data:", data))
};

module.exports = useSocket;
