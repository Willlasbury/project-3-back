const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Offer extends Model {}

Offer.init(
  {
    offer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
  }
);

module.exports = Offer;
