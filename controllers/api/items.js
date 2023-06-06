const router = require("express").Router();
const { Item, User, Category, Photo } = require("../../models/");
const jwt = require("jsonwebtoken");

// Get all items
router.get("/", async (req, res) => {
  try {
    const dbData = await Item.findAll({
      include: [{ model: Photo }],
    });

    console.log("===\n\n\ntest\n\n\n===");
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Items in database!" });
    }
    console.log("dbData:", dbData);
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get items", err: err });
  }
});
router.get("/browse", async (req, res) => {
  try {
    const dbData = await Item.findAll({
      include: [{ model: Photo }],
      where: { sold_status: false },
    });

    console.log("===\n\n\ntest\n\n\n===");
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Items in database!" });
    }
    console.log("dbData:", dbData);
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get items", err: err });
  }
});
// Get item by id
router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const dbData = await Item.findByPk(itemId, { include: [{ model: Photo }] });

    if (!dbData) {
      return res.status(404).json({ msg: "Item not found!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get user", err: err });
  }
});
//get photo
router.get("/photo/:id", async (req, res) => {
  try {
    const photoId = req.params.id;
    const dbData = await Photo.findByPk(photoId, {
      include: [{ model: Item }],
    });

    if (!dbData) {
      return res.status(404).json({ msg: "Item not found!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get user", err: err });
  }
});
//Create Item
router.post("/", async (req, res) => {
  try {
    const sellerId = req.body.seller_id;
    const user = await User.findByPk(sellerId);
    const categoryId = req.body.category_id;
    const category = await Category.findByPk(categoryId);

    const newItem = {
      title: req.body.title,
      minimum_trade: req.body.minimum_trade,
      condition: req.body.condition,
    };
    //if want to add multiple would have to make a bulk create where urls are added into an array and then mapping over it. Include an array in the request body and if there are multiple photos do a bulk
    const dbData = await Item.create(newItem);
    const photoArr = [];
    const newPhoto = {
      url: req.body.url,
      item_id: dbData.id,
    };
    const token = req.body.token;

    const myData = req.body.url.map(async (url) => {
      console.log("url:", url);
      const photo = await Photo.create({ url: url });
      console.log("photo:", photo);

      photo.setItem(dbData);
    });

    // const dbPhotoData = await Photo.create(newPhoto);
    // dbData.setCategory(category);

    return res.json({
      item: dbData,
      photo: myData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Could not create item", err: err });
  }
});
//Update Item
router.put("/:id", async (req, res) => {
  try {
    const buyerId = req.body.buyer_id;
    const user = await User.findByPk(buyerId);
    const categoryId = req.body.category_id;
    const category = await Category.findByPk(categoryId);

    const editItem = await Item.update(
      {
        title: req.body.title,
        minimum_trade: req.body.min,
        condition: req.body.condition,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!editItem[0]) {
      return res.status(404).json({ msg: "no task with this id in database!" });
    }
    const item = await Item.findByPk(req.params.id);
    console.log(editItem);
    item.setBuyer(user);
    item.setCategory(category);
    res.json(editItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});
//Delete Item
router.delete("/:id", (req, res) => {
  // delete a item by its `id` value
  Item.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedItem) => {
      res.json(deletedItem);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
