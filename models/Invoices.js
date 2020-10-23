const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentInvoiceSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: "rentedproducts",
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },

    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
},

);
module.exports = RentInvoice = mongoose.model("invoiceRent", RentInvoiceSchema);
