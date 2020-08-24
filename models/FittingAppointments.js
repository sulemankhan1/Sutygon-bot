const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FittingAppointmentSchema = new mongoose.Schema({
    appointmentNumber: {
        type: String,
    },
    trackingNumber: {
        type: String,
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

module.exports = FittingAppointment = mongoose.model("fittingappointment", FittingAppointmentSchema);
