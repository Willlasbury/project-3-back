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
    console.log("data:", data)
    if (data) {
      const userInfo = getTokenInfo(data);
      users[userInfo.userId] = socket.id;
      console.log("users:", users)
    }
  });

  socket.on('offer', data =>{
    console.log("users:", users)
    console.log("users[data.seller_id]:", users[data.seller_id])
    io.to(users[data.seller_id]).emit("new_offer", data)
  }
    // io.to(data.seller_id)
    )
};

module.exports = useSocket;
