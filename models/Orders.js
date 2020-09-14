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

    returnDate: {
        type: String,
        required: true,
        // set:date => moment(date).format('DD MM YYYY')
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
    deliveryDate: {
        type: String,
        required: true,
        // set: date => moment(date).format('DD MM YYYY')
    },
    status: {
        type: String,
        required: true,
        default: "new"
    },
   

},
    {
        timestamps: true
    }
   
);

module.exports = Order = mongoose.model("order", OrderSchema);
