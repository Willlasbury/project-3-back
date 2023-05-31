const User = require("./Users")
const Item = require('./Item')
const Photo = require('./Photos')
const Category = require('./Category')


Item.belongsTo(User, {
    as: "Seller",
    foreignKey: 'seller_id'
})

Item.belongsTo(User, {
    as: "Buyer",
    foreignKey: 'buyer_id'
})

Photo.belongsTo(Item, {
    as: "Photo",
    foreignKey: "item_id"
})

Category.belongsTo(Item, {
    as: "Category",
    foreignKey: "item_id"
})


module.exports = {User, Item, Photo, Category}