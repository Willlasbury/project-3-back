const router = require("express").Router();
const Item = require("../../models/Item");
const jwt = require('jsonwebtoken')

// Get all items
router.get("/", async (req, res) => {
  try {
    const dbData = await Item.findAll();
    console.log('===\n\n\ntest\n\n\n===')
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Items in database!" });
    }
    console.log("dbData:", dbData)
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
      const dbData = await Item.findByPk(itemId);
  
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
      const newItem = {
        title: req.body.title,
        minimum_trade: req.body.min,
        category: req.body.category,
        condition: req.body.condition,
        photo: req.body.photo,
      };
  
      const dbData = await Item.create(newItem);
    
  
      return res.json({
        item:dbData
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Could not create item", err: err });
    }
  });
  //Update Item
  router.put("/:id", (req, res) => {
    Item.update(
      {
        title: req.body.title,
        minimum_trade: req.body.min,
        category: req.body.category,
        condition: req.body.condition,
        photo: req.body.photo,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((editItem) => {
        if (!editItem[0]) {
          return res
            .status(404)
            .json({ msg: "no task with this id in database!" });
        }
        res.json(editItem);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
  });
   //Delete Item
 router.delete('/:id', (req, res) => {
    // delete a item by its `id` value
    Item.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((deletedItem)=>{
      res.json(deletedItem);
    })
    .catch((err) => res.json(err));
  })
  


module.exports = router;