const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
    password:{
        type: DataTypes.STRING,
         allowNull:false,
         validate:{
            len:[8]
         }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail:true
        }
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    seller_rating:{
        type: DataTypes.INTEGER(1,5),
        defaultValue: 5,
        allowNull: false,
    }

},{
    sequelize,
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj
        }
    }
});

module.exports=User