const sequelize = require("../config/sequelize");
const { User, Item, Photo, Category, Message } = require("../models");
const userSeeds = require("./users");
const itemSeeds = require("./items");
const photoSeeds = require("./photos");
const categorySeeds = require("./categories");
const messageSeeds = require("./messages");

const startSeedin = async () => {
  try {
    await sequelize.sync({ force: true });

    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });
    const itemData = await Item.bulkCreate(itemSeeds);
    const photoData = await Photo.bulkCreate(photoSeeds);
    const categoryData = await Category.bulkCreate(categorySeeds);
    const messageData = await Message.bulkCreate(messageSeeds);

    // Assign sellers and buyers
    for (let i = 0; i < itemData.length; i++) {
      const user = await User.findByPk(Math.floor(Math.random() * 9) + 1);
      await itemData[i].setSeller(user);

      const category = await Category.findByPk(
        Math.floor(Math.random() * 9) + 1
      );
      await itemData[i].setCategory(category);

      // randomly assign buyers to only some items
      if (Math.floor(Math.random() * 2)) {
        const buyer = await User.findByPk(Math.floor(Math.random() * 9));
        await itemData[i].setBuyer(buyer);
      }
    }

    // assign random items to photos
    for (let i = 0; i < photoData.length; i++) {
      const item = await Item.findByPk(Math.floor(Math.random() * 9) + 1);
      await photoData[i].setItem(item);
    }

    // assign random senders and recipients to messages
    for (let i = 0; i < messageData.length; i++) {
      let randNum;
      let diffNum;
      while (randNum === diffNum) {
        randNum = Math.floor(Math.random() * 9) + 1;
        diffNum = Math.floor(Math.random() * 9) + 1;
      }
      const sender = await User.findByPk(randNum);
      const recipient = await User.findByPk(diffNum);
      await messageData[i].setSender(sender);
      if (i <= 4) {
        await messageData[i].setRecipient(4);
      } else {
        await messageData[i].setRecipient(recipient);
      }
    }
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

startSeedin();
