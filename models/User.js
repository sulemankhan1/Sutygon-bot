const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  password: {
    type: String,
    requried: true,
  },
  accountStatus: {
    type: String,
    default: 'active',
  },
  avatar: {
    type: String,
  },
  type: {
    type: String,
    default: 'Employee',
  },
  sections: {
    type: [String],
    enum: [
      'Inventory',
      'Barcode',
      'Customers',
      'Rent a product',
      'Report',
      'Return a product',
      'Orders',
      'Appointments',
      'Calender',
    ],
  },
  isPasswordChanged: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('user', UserSchema)
