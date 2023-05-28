const router = require("express").Router();
const User = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const dbData = await User.findAll();

    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Users in database!" });
    }
      return res.json(dbData);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get users", err: err });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dbData = await User.findByPk(userId);

    if (!dbData) {
      return res.status(404).json({ msg: "User not found!" });
    }
    return res.json(dbData);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get user", err: err });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    const newUser = {
      username: req.body.userName,
      password: req.body.password,
    };
    const dbData = await User.create(newUser);
  
    return res.json(dbData)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Could not create user", err: err });
  }
});

module.exports = router;
