const router = require("express").Router();
const User = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dbData = await User.findByPk(userId)
    const user = await dbData.get({plain:true})
    if (user) {
        res.json(user)
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.post("/", async (req, res) => {
    try {
      const newUser = {
        username: req.body.userName,
        password: req.body.password,
      }
      const dbData = await User.create(newUser)
      
      if (dbData) {
          res.json(dbData)
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "some error", err: err });
    }
});

module.exports = router;
