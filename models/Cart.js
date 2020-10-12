const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    state: {
        type: String,
        default: "active"
    },
    modifiedOn: {
        type: Date,
    },
    products:
        [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                },
                quantity: {
                    type: String
                },
                barcodes: {
                    type: Array
                },
                total_price: {
                    type: String
                }
            },
        ],


},
);

module.exports = Cart = mongoose.model("cart", CartSchema);
