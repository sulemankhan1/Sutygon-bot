const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

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
autoIncrement.initialize(mongoose.connection);
FittingAppointmentSchema.plugin(autoIncrement.plugin, {
  model: "appointment", // collection or table name in which you want to apply auto increment
  field: "appointmentNumber", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});
// FittingAppointmentSchema.plugin(AutoIncrement, {inc_field: 'appointmentNumber'});
module.exports = FittingAppointment = mongoose.model("appointment", FittingAppointmentSchema);
