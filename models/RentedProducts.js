const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const RentedProductSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        default:0
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
    barcodes: {
        type: Array
    },
    rentDate: {
        type: Date,

    },
    returnDate: {
        type: Date,

    },
    status: {
        type: String,
        default: "new"
    },



},

);
// RentedProductSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });
module.exports = RentedProduct = mongoose.model("rentedproduct", RentedProductSchema);
