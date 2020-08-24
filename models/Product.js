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
    type: String,
  },
  size: {
    type: String,
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
  RentedQuantity: {
    type: String,
  },
   date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = Product = mongoose.model("product", ProductSchema);
