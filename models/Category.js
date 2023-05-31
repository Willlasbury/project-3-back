const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Category extends Model {}

Category.init(
  {
    // add properites here, ex:
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Category;
