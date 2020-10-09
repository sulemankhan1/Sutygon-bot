const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const FittingAppointment = require("../../models/FittingAppointment");
const { check, validationResult } = require("express-validator");

// @route   POST api/appointments/add
// @desc    Add New Appointment
// @access  private
router.post(
    "/add",
    [
        // check("appointmentNumber", "Appointment Number Required").not().isEmpty(),
        check("customer", "Customer Name Required").not().isEmpty(),
        check("start", "Appointment Date Name Required").not().isEmpty(),
       
    ],
   
   auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let appointment = new FittingAppointment(req.body);
            await appointment.save();
            res.json({ appointment, msg: "Appointment Added Successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
);


// @route   GET api/appointments
// @desc    Get all Appointments
// @access  Private
router.get("/",
  auth,
    async (req, res) => {
        try {
            const appointments = await FittingAppointment.find();
            res.json(appointments);
        } catch (err) {
            console.log(err);
            res.statu(500).send("Server Error!");
        }
    });

// @route  GET api/appointments/:id
// @desc   Get Appointment by id (Search Appointment by id)
// @access Private
router.get("/:id",
    
  auth,  
    async (req, res) => {
        try {
            const appointment = await FittingAppointment.findById(req.params.id);

            if (!appointment) {
                return status(404).json({ msg: "No Appointment found" });
            }

            res.json(appointment);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Appointment found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });


// @route  DELETE api/appointments/:id
// @desc   Cancel an Appointment
// @access Private
router.delete("/:id",
    auth,
    async (req, res) => {
        try {
            const appointment = await FittingAppointment.findById(req.params.id);

            if (!appointment) {
                return res.status(404).json({ msg: "No Appointment found" });
            }

            await appointment.remove();

            res.json({ msg: "Appointment Cancelled" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Appointment found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

module.exports = router;
