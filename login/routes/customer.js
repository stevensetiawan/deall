"use strict"
const router = require('express').Router()
const { register, auth } = require('../middlewares/passport')

router.post('/signup', register)
router.post('/login', auth)

module.exports = router