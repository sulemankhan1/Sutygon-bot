const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: Array,
  },
  size: {
    type: Array,
  },
  fabric: {
    type: String,
  },
  inStock: {
    type: String,
  },
  availableQuantity: {
    type: String,
  },
  rentedQuantity: {
    type: String,
  },
   date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = Product = mongoose.model("product", ProductSchema);
