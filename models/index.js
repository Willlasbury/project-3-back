const User = require("./Users")
const Item = require('./Item')

module.exports = {User, Item}
User.hasMany(Item,{
    foreignKey: 'userId'
});
Item.hasOne(User);
Item.belongsTo(User,{
    onDelete: 'CASCADE'
})