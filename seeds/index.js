const sequelize = require("../config/sequelize");
const { User, Item, Photo, Category } = require("../models");
const userSeeds = require("./users");
const itemSeeds = require("./items");
const photoSeeds = require("./photos");
const categorySeeds = require("./categories");

const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });

    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });
    const itemData = await Item.bulkCreate(itemSeeds);
    const photoData = await Photo.bulkCreate(photoSeeds);
    const categoryData = await Category.bulkCreate(categorySeeds);

    for (let i = 0; i < itemData.length; i++) {
      const user = await User.findByPk(Math.floor(Math.random() * 9) + 1);
      itemData[i].setSeller(user);

      const category = await Category.findByPk(
        Math.floor(Math.random() * 9) + 1
      );
      itemData[i].setCategory(category);

      // randomly assign buyers to only some items
      if (Math.floor(Math.random()*2)) {
        const buyer = await User.findByPk(Math.floor(Math.random() * 9));
        itemData[i].setBuyer(buyer);
      }
    }

    for (let i = 0; i < photoData.length; i++) {
      const item = await Item.findByPk(Math.floor(Math.random() * 9) + 1);
      photoData[i].setItem(item);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
