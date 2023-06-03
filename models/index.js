const User = require("./Users");
const Item = require("./Item");
const Photo = require("./Photos");
const Category = require("./Category");

// ITEM.SELLER KEY
User.hasMany(Item);

Item.belongsTo(User, {
  as: "Seller",
  foreignKey: "seller_id",
});

// ITEM.BUYER KEY
User.hasMany(Item);

Item.belongsTo(User, {
  as: "Buyer",
  foreignKey: "buyer_id",
});

// ITEM.CATEGORY KEY
Category.hasMany(Item);

Item.belongsTo(Category, {
  foreignKey: "category_id",
});

// PHOTO.ITEM KEY
Item.hasMany(Photo);

Photo.belongsTo(Item, {
  foreignKey: "item_id",
});

module.exports = { User, Item, Photo, Category };
