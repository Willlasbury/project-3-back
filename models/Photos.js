const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Photo extends Model {}

Photo.init(
  {
    // add properites here, ex:
    url: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id",
      },
    },
  },
  { sequelize }
);

module.exports = Photo;
