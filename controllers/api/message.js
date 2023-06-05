const router = require("express").Router();
const getTokenInfo = require('../utils/getTokenInfo')
const {Message} = require("../../models");

// Check for messages for a user
router.get("/:token", async (req, res) => {
    try {
      const token = req.params.token
      const tokenData = getTokenInfo(token)
      const dbData = await Message.findAll({where: {recipient_id: tokenData.userId}});
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get photos", err: err });
    }
  });

  module.exports = router