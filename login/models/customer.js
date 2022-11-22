"use strict"
const mongoose = require('mongoose')
const {
  Schema
} = mongoose
const bcrypt = require("../helpers/bcrypt")
module.exports = (mongoose) => {
  const schema = Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true
      }
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: '-'
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
      required: true
    }
  }, {
    timestamps: true
  })

  schema.pre('save', async function (done) {
    if (this.isModified('password')) {
      const hashed = await bcrypt.hasher(this.get("password"))
      this.set("password", hashed)
    }
    done()
  })

  schema.methods.isValidPassword = async function (password, user_password) {
    const compare = await bcrypt.checker(password, user_password)
    return compare
  }

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject()
    object.id = _id
    return object
  })

  const Customer = mongoose.model("customers", schema)
  return Customer
}