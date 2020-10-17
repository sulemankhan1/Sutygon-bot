const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const FittingAppointmentSchema = new mongoose.Schema({
    appointmentNumber: {
        type: Number
    },
     start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    title:{
        type:String,
        default:"Appointment"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
  
},
);
FittingAppointmentSchema.plugin(AutoIncrement, {inc_field: 'appointmentNumber'});
module.exports = FittingAppointment = mongoose.model("fittingappointment", FittingAppointmentSchema);
