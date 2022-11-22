"use strict"
const dbConfig = require('../config/db.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {
  mongoose : mongoose,
  url : dbConfig.url,
  Customer :require("./customer")(mongoose),
}

module.exports = db