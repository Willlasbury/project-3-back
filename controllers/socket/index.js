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

  socket.on("accept_offer", async (data) => {
    try {
      
      // adjust item info in db
      const itemUpdate = {
        sold_status: true,
        buyer_id: data.offer.offerer_id
      }
      // update item
      const item = await Item.update(itemUpdate, {where:{id: data.offer.Item.id}},)
      // delete offer
      const res = await Offer.update({accepted:true}, { where: { id: data.offer.id } });
      console.log("res:", res)

      // send notification to offerer
      // io.to(users[data.offer.offerer_id]).emit("done_deal");
      socket.emit('accept_res')
    } catch (error) {
      console.log("error:", error)
    }
  });

  socket.on("decline_offer", async (data) => {
    // adjust offer info in db
    console.log("data.offer:", data.offer);
    // delete an offer
    const res = await Offer.destroy({ where: { id: data.offer.id } });

    // send notification to offerer
    // TODO: handle store message if user is not online
    // Message.create()
    // io.to(users[data.offer.offerer_id]).emit("no_deal");
    socket.emit("decline_res", res);
  });
};

module.exports = useSocket;
