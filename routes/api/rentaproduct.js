const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RentedProduct = require("../../models/RentedProducts");

const Order = require("../../models/Orders");
const { check, validationResult } = require("express-validator");

// @route   POST api/rentedproducts/add
// @desc    Add New Rented Product
// @access  private
router.post(
    "/add",
    [
        check("orderNumber", "Order Number Required").not().isEmpty(),
        check("trackingNumber", "Tracking Number Required").not().isEmpty(),
        check("customer", "Customer Name Required").not().isEmpty(),
        check("product", "Product Name Required").not().isEmpty(),
        check("orderedQuantity", "Quantity Required").not().isEmpty(),
        check("orderedSize", "Size Required").not().isEmpty(),
        check("returnDate", "Return Date Required").not().isEmpty(),
        check("deliveryDate", "Delivery Date Required").not().isEmpty(),
        // check("dateRented", "Return Date Required").not().isEmpty(),
    ],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let rentedProduct = new RentedProduct(req.body);
            let order = new Order(req.body);
            await order.save();
            await rentedProduct.save();

            res.json({ msg: "Order Added Successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
);

// @route  POST api/rentedproducts/:id
// @desc   Update RentedProduct
// @access Private
router.post(
    "/:id",
    [
        check("orderNumber", "Order Number Required").not().isEmpty(),
        check("trackingNumber", "Tracking Number Required").not().isEmpty(),
        check("customer", "Customer Name Required").not().isEmpty(),
        check("customer", "Customer Name Required").not().isEmpty(),
        check("user", "User Name Required").not().isEmpty(),
        check("orderedQuantity", "Quantity Required").not().isEmpty(),
        check("orderedSize", "Size Required").not().isEmpty(),
        // check("createdOn", "Created Date Required").not().isEmpty(),
        check("returnDate", "Return Date Required").not().isEmpty(),
        check("deliveryDate", "Delivery Date Required").not().isEmpty(),
    ],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await RentedProduct.updateOne({ _id: req.params.id }, {
                $set: {
                    product: req.body.name,
                    orderedQuantity: req.body.image,
                    orderedSize: req.body.color,
                    returnDate: req.body.size,
                }
            });
            res.json({ msg: "Order Updated Successfully" });
        } catch (err) {
            console.error(err.message);
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    }
);

// @route   GET api/products
// @desc    Get all RentedProduct
// @access  Private
router.get("/",auth,
    async (req, res) => {
        try {
            const rentedProducts = await RentedProduct.find().populate("customer").populate("product").populate("user");
            res.json(rentedProducts);
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server Error!");
        }
    });

// @route  GET api/rentedproducts/:id
// @desc   Get Product by id
// @access Private
router.get("/:id",auth,
    async (req, res) => {
        try {
            const rentedProduct = await RentedProduct.findById(req.params.id);

            if (!rentedProduct) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }

            res.json(rentedProduct);
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



// @route  GET api/rentedproducts/search/trackingNumber/:trackingNumber
// @desc   Get Product (Search for Product by trackingNumber)
// @access Private
router.get("/search/trackingNumber/:trackingNumber",auth,

async (req, res) => {
    try {
        const rentedProduct = await RentedProduct.findOne({
            trackingNumber: { $eq: req.params.trackingNumber },
                 });

        if (!rentedProduct) {
            return res
                .status(404)
                .json({ msg: "No Order found" });
        }

        res.json(rentedProduct);
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

// @route  DELETE api/rentedproducts/:id
// @desc   Delete a Product
// @access Private
router.delete("/:id",
    auth,
    async (req, res) => {
        try {
            const rentedProduct = await RentedProduct.findById(req.params.id);

            if (!rentedProduct) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }

            await rentedProduct.remove();

            res.json({ msg: "Order Cancelled" });
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
