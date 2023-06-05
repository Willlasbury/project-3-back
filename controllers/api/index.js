const router = require('express').Router()
const item = require('./items')
const user = require('./users')
const category = require('./category')
const photo = require('./photo')
const message = require('./message')

router.use('/users', user)
router.use('/items', item)
router.use('/categories', category)
router.use('/photos', photo)
router.use('/messages', message)

router.get("/", (req, res) => res.json("home"));

module.exports = router