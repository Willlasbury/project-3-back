const sequelize = require("../config/index");
const {User, Item} = require("../models");
const userSeeds = require("./users");
const itemSeeds = require("./items");

const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });
    const itemData = await Project.bulkCreate(itemSeeds);
    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });

    for (let i = 0; i < userData.length; i++) {
      await userData[i].addItems(i);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
