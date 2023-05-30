const router = require("express").Router();
const User = require("../../models/Users");
const jwt = require('jsonwebtoken')

// Get all users
router.get("/", async (req, res) => {
  try {
    const dbData = await User.findAll();
    console.log('===\n\n\ntest\n\n\n===')
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Users in database!" });
    }
    console.log("dbData:", dbData)
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
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const dbData = await User.create(newUser);

    const token = jwt.sign({
      userId: dbData.userId,
      userName: dbData.userName,
    },process.env.JWT_SECRET,{
      expiresIn:"2h"
  })
  console.log("token:", token)
  

    return res.json({
      token,
      user:dbData
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Could not create user", err: err });
  }
});
  //Update User
  router.put("/:id", (req, res) => {
    User.update(
      {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((editUser) => {
        if (!editUser[0]) {
          return res
            .status(404)
            .json({ msg: "no User with this id in database!" });
        }
        res.json(editUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
  });
 //Delete User
 router.delete('/:id', (req, res) => {
  // delete a user by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedUser)=>{
    res.json(deletedUser);
  })
  .catch((err) => res.json(err));
})


module.exports = router;
