const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 const autoIncrement = require("mongoose-auto-increment");

const RentedProductSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
    },
       user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    customerContactNumber:{
        type:String
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
        default: "New"
    },

    insuranceAmt:{
        type:String,
    },


},
{timestamps: true}


);

//  RentedProductSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });
module.exports = RentedProduct = mongoose.model("rentedproduct", RentedProductSchema);
