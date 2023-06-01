const router = require("express").Router();
const {Category,Item} = require('../../models')

// Get all categories
router.get("/", async (req, res) => {
    try {
      const dbData = await Category.findAll();
      console.log("===\n\n\ntest\n\n\n===");
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no Categories in database!" });
      }
      console.log("dbData:", dbData);
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get categories", err: err });
    }
  });
  // Get category by id
router.get("/:id", async (req, res) => {
    try {
      const categoryId = req.params.id;
      const dbData = await Category.findByPk(categoryId);
  
      if (!dbData) {
        return res.status(404).json({ msg: "User not found!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get user", err: err });
    }
  });
  //Create Category
router.post("/", async (req, res) => {
    try {
      const newCategory = {
        name: req.body.name
      };
  
      const dbData = await Category.create(newCategory);
  
      return res.json({
        category: dbData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Could not create category", err: err });
    }
  });
  //Update a Category
  router.put("/:id", (req, res) => {
    Category.update(
      {
       name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((editCategory) => {
        if (!editCategory[0]) {
          return res
            .status(404)
            .json({ msg: "no Category with this id in database!" });
        }
        res.json(editCategory);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
  });
  // delete a category by its `id` value
  router.delete("/:id", (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        res.json(deletedCategory);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;