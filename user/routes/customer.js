"use strict"
const router = require('express').Router()
const customer = require('../controllers/customer')
const passport = require('passport')
const isAdmin = require('../middlewares/isAdmin')

router.use(passport.authenticate('jwt', { session: true }))
router.get('/', customer.getCustomers)

router.use(isAdmin)
router.get('/:id', customer.getCustomerId)
router.put('/:id', customer.updateCustomer)
router.delete('/:id', customer.deleteCustomer)

module.exports = router