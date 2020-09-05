const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const FittingAppointmentSchema = new mongoose.Schema({
    appointmentNumber: {
        type: Number
    },
    trackingNumber: {
        type: String,
        unique: true,
    },
    appointmentDate: {
        type: Date,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "employee",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
 

},
);
FittingAppointmentSchema.plugin(AutoIncrement, {inc_field: 'appointmentNumber'});
module.exports = FittingAppointment = mongoose.model("fittingappointment", FittingAppointmentSchema);
