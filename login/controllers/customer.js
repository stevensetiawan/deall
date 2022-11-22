"use strict"
const { Customer } = require('../models')
const bcrypt = require("../helpers/bcrypt")

exports.getCustomerId = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Customer.findById(id)
    if (!result) {
      return res.status(404).send({
        message: "Customer is not found"
      })
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data by id"
    })
  }
}

exports.getCustomers = async (req, res) => {
  try {
    const result = await Customer.find().sort({
      updatedAt: -1
    })
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data"
    })
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id
    if(req.user.role ==='admin'){
      let hashed = ''
      if(req.body.password && req.body.password.trim().length > 0) {
        hashed = await bcrypt.hasher(req.body.password)
      }       
      const customer = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        password: hashed,
        email: req.body.email,
        role: req.body.role
      }
      const result = await Customer.findByIdAndUpdate(
        id, customer, {
          returnOriginal: false
        }
      )
      if (!result) {
        return res.status(404).send({
          message: "Customer is not found"
        })
      } else {
        return res.status(200).send({
          message: "Customer is updated",
          data: result
        })
      }
    } else if(req.user.role ==='user'){
      const customer = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
      }
      const result = await Customer.findByIdAndUpdate(
        id, customer, {
          returnOriginal: false
        }
      )
      if (!result) {
        return res.status(404).send({
          message: "Customer is not found"
        })
      } else {
        return res.status(200).send({
          message: "Customer is updated",
          data: result
        })
      }
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to update customer"
    })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Customer.findByIdAndRemove(id)

    if (!result) {
      return res.status(404).send({
        message: "Customer is not found"
      })
    } else {
      return res.status(200).send({
        message: "Customer is deleted"
      })
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to delete customer"
    })
  }
}