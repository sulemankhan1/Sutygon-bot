const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new mongoose.Schema({
  product: {
    type: String,
  },
  quantity: {
    type: String,
    required: true,
  },
   date: {
    type: Date,
    default: Date.now,
  },

},
);

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
