const getTokenInfo = require("../utils/getTokenInfo");
const { Offer, Item, User } = require("../../models");

const handleOffer = async (data, users, io) => {
  const offererInfo = getTokenInfo(data.token);
  const newOffer = {
    offer: data.data,
  };
  // create offer
  const offerData = await Offer.create(newOffer);

  // add foreign keys
  const item = await Item.findByPk(data.item.id);
  offerData.setItem(item);

  const user = await User.findByPk(offererInfo.userId);
  offerData.setOfferer(user);

  // send notification to item owner that there is a new offer
  io.to(users[data.item.seller_id]).emit("new_offer", data);
};

module.exports = handleOffer;
