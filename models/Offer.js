const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Offer extends Model {}

Offer.init(
  {
    offerText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offerItem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Offer;
