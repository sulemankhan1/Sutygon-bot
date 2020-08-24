const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
    },
    trackingNumber: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
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
        ref: "product",
    },
    orderQuantity: {
        type: String,
        required: true,
    },
    orderedSize: {
        type: String,
        required: true,
    },

    dateRented: {
        type: Date,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
  
},
);

module.exports = Order = mongoose.model("order", OrderSchema);
