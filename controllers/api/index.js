const router = require('express').Router()

const user = require('./users')
router.use('/users', user)

router.get("/", (req, res) => res.json("home"));

module.exports = router