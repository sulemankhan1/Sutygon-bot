const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');

const InventorySchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
},
  quantity: {
    type: String,
    required: true,
  },
   date: {
    type: String,
    set: date => moment(date.now).format('DD MMM YYYY')
  },

},
);

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
