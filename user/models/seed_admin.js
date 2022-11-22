"use strict"
const mongoose = require('mongoose')
const {
  Customer
} = require('../models')

mongoose
  .connect('mongodb://0.0.0.0:27017/travel')
  .then((result) => {
    console.log("connect to mongodb")
  })
  .catch((err) => {
    console.log("error while connect mongoDB", err.message)
    process.exit()
  })

const seedAdmin = [{
  name: 'admin',
  email: 'admin@mail.com',
  password: 'super',
  phone: '0123456789',
  role: 'admin',
  address: 'jakarta'
}]

const seedDB = async () => {
  await Customer.create(seedAdmin)
}

seedDB().then(() => {
  mongoose.connection.close()
})