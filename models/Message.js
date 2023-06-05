const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Message extends Model {}

Message.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  { sequelize }
);
module.exports = Message;
