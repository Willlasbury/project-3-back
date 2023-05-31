const User = require("./Users")
const Item = require('./Item')

module.exports = {User, Item}

Item.belongsTo(User, {
    as: "Seller",
    foreignKey: 'seller_id'
})

Item.belongsTo(User, {
    as: "Buyer",
    foreignKey: 'buyer_id'
})