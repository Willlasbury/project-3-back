const sequelize = require("../config/sequelize");
const {User, Item} = require("../models");
const userSeeds = require("./users");
const itemSeeds = require("./items");

const startSeedin = async () => {
  try {

    await sequelize.sync({ force: true });


    await sequelize.sync({ force: true });
    const itemData = await Item.bulkCreate(itemSeeds);
    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
