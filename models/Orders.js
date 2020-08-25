const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,

    },
    trackingNumber: {
        type: String,
        required: true,
        unique: true,

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
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default:"new"
      }, 
  
},
);

module.exports = Order = mongoose.model("order", OrderSchema);
