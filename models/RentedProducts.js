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
autoIncrement.initialize(mongoose.connection);
RentedProductSchema.plugin(autoIncrement.plugin, {
  model: "rentedproduct", // collection or table name in which you want to apply auto increment
  field: "orderNumber", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

//  RentedProductSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });
module.exports = RentedProduct = mongoose.model("rentedproduct", RentedProductSchema);
