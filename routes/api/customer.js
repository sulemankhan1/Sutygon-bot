const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Customer = require("../../models/Customer");
const { check, validationResult } = require("express-validator");

// @route   POST api/customers/add
// @desc    Add New Customer
// @access  private
router.post(
    "/add",
    [
        check("name", "Customer Name Required").not().isEmpty(),
        check("contactNumber", "Contact Number Required").not().isEmpty(),
        check("email", "Email Required").not().isEmpty(),
        check("phone", "Phone Required").not().isEmpty(),
        check("address", "Address Required").not().isEmpty(),
        check("noOfOrders", "Quantity Required").not().isEmpty(),

    ],
   

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array() });
        }

        try {
            let customer = new Customer(req.body);
            await customer.save();
            res
                .status(200)
                .json({ msg: "Customer Added Successfully" });
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server error");
        }
    }
);

// @route   GET api/customers
// @desc    Get all customers
// @access  Private
router.get("/", auth,
    async (req, res) => {
        try {
            const customers = await Customer.find();
            res.json(customers);
        } catch (err) {
            console.log(err);
            res.statu(500).send("Server Error!");
        }
    });

// @route  GET api/customers/:id
// @desc   Get Customer by id
// @access Private
router.get("/:id", auth,
    async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id);

            if (!customer) {
                return res
                    .status(404)
                    .json({ msg: "No Customer found" });
            }

            res.json(customer);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Customer found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });



// @route  GET api/customer/:name
// @desc   Get Customer (Search for customer)
// @access Private
router.get("/search/:name", auth,
    async (req, res) => {
        try {
            const customer = await Customer.findOne({ name: { $eq: req.params.name } });

            if (!customer) {
                return status(404).json({ msg: "No Customer found" });
            }

            res.json(customer);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Customer found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

// @route  DELETE api/customers/:id
// @desc   Delete a Customer
// @access Private
router.delete("/:id", auth,
    async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id);

            if (!customer) {
                return res.status(404).json({ msg: "No Customer found" });
            }

            await customer.remove();

            res.json({ msg: "Customer Successfully Removed" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Customer found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

module.exports = router;
