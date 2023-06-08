const { Offer} = require('../../models')


async function declineOffer(data, users, socket, io) {
  // adjust offer info in db
  console.log("data.offer:", data.offer);
  // delete an offer
  const res = await Offer.destroy({ where: { id: data.offer.id } });

  // send notification to offerer
  // TODO: handle store message if user is not online
  // Message.create()
  // io.to(users[data.offer.offerer_id]).emit("no_deal");
  socket.emit("decline_res", res);
}

module.exports = declineOffer