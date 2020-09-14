const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');


const RentedProductSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,

    },
    trackingNumber: {
        type: String,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    orderedQuantity: {
        type: String,
        required: true,
    },

    orderedSize: {
        type: String,
        required: true,
    },
    dateRented: {
        type: Date,
        // set: date => moment(date).format('DD MMM YYYY')

    },
    deliveryDate: {
        type: Date,
        // set: date => moment(date).format('DD MMM YYYY')

    },
    returnDate: {
        type: Date,
        // set: date => moment(date).format('DD MMM YYYY')

    },
    status: {
        type: String,  
        default: "new"
    },
   


},
    {
        timestamps: true
    }
);

module.exports = RentedProduct = mongoose.model("rentedproduct", RentedProductSchema);
