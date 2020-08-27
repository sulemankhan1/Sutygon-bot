const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/Orders");
const { check, validationResult } = require("express-validator");

// @route   POST api/orders/add
// @desc    Add New Order
// @access  private
router.post(
    "/add",
    [
        check("orderNumber", "Order Number Required").not().isEmpty(),
        check("trackingNumber", "Tracking Number Required").not().isEmpty(),
        check("orderDate", "Order Date Required").not().isEmpty(),
        check("returnDate", "Return Date Required").not().isEmpty(),
        check("customer", "Customer Name Required").not().isEmpty(),
        check("employee", "Employee Name Required").not().isEmpty(),
        check("product", "Product Name Required").not().isEmpty(),
        check("orderedQuantity", "Quantity Required").not().isEmpty(),
        check("orderedSize", "Size Required").not().isEmpty(),
        check("deliveryDate", "Delivery Date Required").not().isEmpty(),
        check("status", "Status Required").not().isEmpty(),

    ],
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array() });
        }

        try {
            let order = new Order(req.body);
            await order.save();
            res
                .json({ msg: "Order Added Successfully" });
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server error");
        }
    }
);


// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.get("/", auth,
    async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (err) {
            console.log(err);
            res
            .statu(500)
            .send("Server Error!");
        }
    });

// @route  GET api/orders/:id
// @desc   Get Order by id (Search order by id)
// @access Private
router.get("/:id",
    auth,
    async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return res
                .status(404)
                .json({ msg: "No Order found" });
            }

            res.json(order);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                .status(404)
                .json({ msg: "No Order found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });


// @route  GET api/orders/search/:product/:customer
// @desc   Get Order (Search for Order by product)
// @access Private
router.get("/search/:product/:customer/:employee",
    auth,

    async (req, res) => {
        try {
            const order = await Order.findOne({
                product: { $eq: req.params.product },
                customer: { $eq: req.params.customer },
                employee: { $eq: req.params.employee },
            });

            if (!order) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }

            res.json(order);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

    // @route  GET api/orders/search/trackingNumber/:trackingNumber
// @desc   Get Order (Search for Order by product)
// @access Private
router.get("/search/trackingNumber/:trackingNumber",
auth,
async (req, res) => {
    try {
        const order = await Order.findOne({
            trackingNumber: { $eq: req.params.trackingNumber },
                 });

        if (!order) {
            return res
                .status(404)
                .json({ msg: "No Order found" });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        // Check if id is not valid
        if (err.kind === "ObjectId") {
            return res
                .status(404)
                .json({ msg: "No Order found" });
        }
        res
            .status(500)
            .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
});

// @route  DELETE api/orders/:id
// @desc   Delete a Order
// @access Private
router.delete("/:id",auth,

    async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return res
                .status(404)
                .json({ msg: "No Order found" });
            }

            await order.remove();

            res.json({ msg: "Order Successfully Removed" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res
                .status(404)
                .json({ msg: "No Order found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

module.exports = router;
