const User = require("./Users")
const Item = require('./Item')

module.exports = {User, Item}

User.hasMany(Item, {
    onDelete: 'CASCADE'
});

Item.belongsTo(User,{
    foreignKey: 'user_id'
})

Item.belongsTo(User,{
    foreignKey: 'buyer_id'
})