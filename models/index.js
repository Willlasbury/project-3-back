const User = require("./Users");
const Item = require("./Item");
const Photo = require("./Photos");
const Category = require("./Category");
const Message = require("./Message");
const Offer = require('./Offer');

// MESSAGE.SENDER KEY
User.hasMany(Message, {
  as: "Sender",
  foreignKey: "sender_id",
});

Message.belongsTo(User, {
  as: "Sender",
  foreignKey: "sender_id",
});

// MESSAGE.RECIPIENT KEY
User.hasMany(Message, {
  as: "Recipient",
  foreignKey: "recipient_id",
});

Message.belongsTo(User, {
  as: "Recipient",
  foreignKey: "recipient_id",
});

// ITEM.SELLER KEY
User.hasMany(Item, {
  as: "Seller",
  foreignKey: "seller_id",
});

Item.belongsTo(User, {
  as: "Seller",
  foreignKey: "seller_id",
});

// ITEM.BUYER KEY
User.hasMany(Item, {
  as: "Buyer",
  foreignKey: "buyer_id",
});

Item.belongsTo(User, {
  as: "Buyer",
  foreignKey: "buyer_id",
});

// ITEM.CATEGORY KEY
Category.hasMany(Item);

Item.belongsTo(Category);

// PHOTO.ITEM KEY
Item.hasMany(Photo);

Photo.belongsTo(Item);

// OFFER.SELLER KEY
User.hasMany(Offer, {
  as: "Offerer",
  foreignKey:"offerer_id"
});
Offer.belongsTo(User, {
  as: "Offerer",
  foreignKey:"offerer_id"
});


// OFFER.ITEM KEY
Item.hasMany(Offer);
Offer.belongsTo(Item);
 
module.exports = { User, Item, Photo, Category, Message, Offer };
