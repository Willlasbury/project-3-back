const router = require('express').Router()

router.get('/', (req, res)=>res.json('chat endpoint'))

module.exports = router