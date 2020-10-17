const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  contactnumber: {
    type: String,
    required: true
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
  password: {
    type: String,
    requried: true,
  },
  accountStatus: {
    type: String,
    default: "active",
  },
  avatar: {
  type: String,
  
  },
  type: {
    type: String,
    default: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = User = mongoose.model("user", UserSchema);
