const router = require('express').Router()
const item = require('./items')
const user = require('./users')

router.use('/users', user)
router.use('/items', item)

router.get("/", (req, res) => res.json("home"));

module.exports = router