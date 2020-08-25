const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentedProductSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,

    },
    trackingNumber: {
        type: String,
        unique: true,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "employee",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",    },
    orderQuantity: {
        type: String,
        required: true,
        unique: true,
    },
    orderedSize: {
        type: String,
        required: true,
    },

    dateRented: {
        type: Date,
    },
    deliveryDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
},
);

module.exports = RentedProduct = mongoose.model("rentedproduct", RentedProductSchema);
