const { Offer } = require("../../models");

const declineOffer = async (data, users, socket, io) => {
  try {
    // adjust offer info in db
    // delete an offer
    const res = await Offer.destroy({ where: { id: data.offer.id } });

    socket.emit("decline_res", res);
  } catch (err) {
    console.log("err:", err);
  }
};
module.exports = declineOffer;
