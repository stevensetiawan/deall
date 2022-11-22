"use strict"
const router = require('express').Router()
const customer = require('./customer')

router.use('/customer', customer)

module.exports = router

