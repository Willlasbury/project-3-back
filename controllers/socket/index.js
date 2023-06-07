const users = {};
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

  socket.on("accept_offer", (data) => {
    // send notification to offerer
    console.log("users:", users)
    console.log(users[data.offer.offerer_id]);
    io.to(users[data.offer.offerer_id]).emit("done_deal");
    // adjust item info in db
    // change item to sold status to true and update item.buyer_id to offer.offerer_id
  });

  socket.on("decline_offer", (data) => {
    // send notification to offerer
    console.log(users[data.offer.offerer_id]);

    io.to(users[data.offer.offerer_id]).emit("done_deal");

    // adjust offer info in db
    // delete an offer
  });
};

module.exports = useSocket;
