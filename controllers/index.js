const router = require("express").Router();

const api = require("./api");
router.use("/api", api);

const chat = require('./socket/chat')
router.use('/chat', chat)

// router.get("/", (req, res) => res.json("home"));

module.exports = router;
