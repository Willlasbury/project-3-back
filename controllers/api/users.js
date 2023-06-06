const router = require("express").Router();
const { User, Item, Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

// Get all users
router.get("/", async (req, res) => {
  try {
    console.log('===\n\n\ntest\n\n\n===')
    const dbData = await User.findAll({include: [{model: Item, as: "Seller", include: [Photo]}]});
    console.log("dbData:", dbData)
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Users in database!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get users", err: err });
  }
});

router.get("/verifytoken", (req, res) => {
  try {
  const token = req.headers.authorization?.split(" ")[1];
  
    const data = jwt.verify(token, process.env.JWT_SECRET);
    User.findByPk(data.userId, {
      include: {model: Item, as: "Seller"},
    }).then((foundUser) => {
      res.json(foundUser);
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ msg: "bad token", err });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dbData = await User.findByPk(userId,{include: [{model:Item, as: "Seller", include: [Photo]}]});

    if (!dbData) {
      return res.status(404).json({ msg: "User not found!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get user", err: err });
  }
});
//Get items from other users, but not current user on browse page
router.get("/otherusers/browse", async (req, res) => {
  try {
    console.log('===\n\n\ntest\n\n\n===')
    const dbData = await User.findAll({include: [{model: Item, as: "Seller", include: [Photo]}]});
    console.log("dbData:", dbData)
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Users in database!" });
    }
    console.log(dbData.length);
    for(var i =0; i<dbData.length; i++){
      if(req.body.username === dbData[i].username){
        dbData.splice(i,1);
      }
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get users", err: err });
  }
});

// Create user/ signup
router.post("/", async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const dbData = await User.create(newUser);

    const token = jwt.sign(
      {
        userId: dbData.id,
        username: dbData.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
      const revealToken = jwt.verify(token, process.env.JWT_SECRET)
    return res.json({
      token,
      user: dbData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Could not create user", err });
  }
});

// login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.userName,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ msg: "invalid login" });
      } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(401).json({ msg: "invalid login" });
      } else {
        const token = jwt.sign(
          {
            username: foundUser.username,
            userId: foundUser.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        return res.json({
          token,
          user: foundUser,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "error",
        err,
      });
    });
});

//Update User
router.put("/:id", async (req, res) => {
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
router.delete("/:id", (req, res) => {
  // delete a user by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => res.json(err));
});



module.exports = router;
