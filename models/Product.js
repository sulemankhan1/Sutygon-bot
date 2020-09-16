const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  color: [{
       colorname: {
        type: String,
        required: true,
       },
    sizes: [{
       size: {
        type: String,
        required: true,
       },
      qty: {
        type: String,
        required: true,
       },
      price: {
        type: String,
        required: true,
       },
      barcode: {
        type: String,
        
       },
    }],
  }],
   date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = Product = mongoose.model("product", ProductSchema);
