const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');

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
        type: String,
        // required: true,
        set: date => moment(date.now).format('DD MMM YYYY')
    },
    returnDate: {
        type: String,
        required: true,
        set:date => moment(date).format('DD MMM YYYY')
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
    deliveryDate: {
        type: String,
        required: true,
        set: date => moment(date).format('DD MMM YYYY')
    },
    status: {
        type: String,
        required: true,
        default:"new"
      }, 
  
},
);

module.exports = Order = mongoose.model("order", OrderSchema);
