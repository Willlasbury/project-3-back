const users = {};
const { Message, Offer, Item } = require("../../models");
const getTokenInfo = require("../utils/getTokenInfo");

const useSocket = (io, socket) => {
  const handleMessage = require("./handleMessage");
  socket.on("message", (data) => handleMessage(data, io));

  // const joinRoom = require('./joinRoom')
  // socket.on('join-room', (data) => joinRoom(data, socket))

  // add user to list of all users
  socket.on("add_user", (data) => {
    if (data) {
      const userInfo = getTokenInfo(data);
      users[userInfo.userId] = socket.id;
    }
  });

  // grab offers from item page on handleOffer
  const handleOffer = require("./handleOffer");
  socket.on("offer", (data) => handleOffer(data, users, io));

  const acceptOffer = require("./acceptOffer");
  socket.on("accept_offer", (data) => acceptOffer(data, users, socket, io));
  console.log("users:", users)
  const declineOffer = require("./declineOffer");
  socket.on("decline_offer", (data) => declineOffer(data, users, socket, io));
};

module.exports = useSocket;
