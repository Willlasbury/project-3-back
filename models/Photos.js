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
  },
  { sequelize }
);

module.exports = Photo;
