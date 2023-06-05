const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

class Bid extends Model {}

Bid.init({
    offer: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
},{
    sequelize
})

module.exports = Bid;