const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require("bcrypt")
const User = require('./Users');

class Item extends Model {}

Item.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    minimum_trade: {
        type: DataTypes.INTEGER(1,10),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sold_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

})
module.exports = Item;