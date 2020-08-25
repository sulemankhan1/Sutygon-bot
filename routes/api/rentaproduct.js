const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator");

// @route   POST api/products/add
// @desc    Add New Product
// @access  private
router.post(
    "/add",
    [
        check("name", "Product Name Required").not().isEmpty(),
        check("image", "Product Image Required").not().isEmpty(),
        check("color", "Product Color Required").not().isEmpty(),
        check("size", "Product Size Required").not().isEmpty(),
        check("fabric", "Product fabric Required").not().isEmpty(),
        check("availableQuantity", "Available Quantity Required").not().isEmpty(),
        check("rentedQuantity", "Rented Quantity Required").not().isEmpty(),

    ],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let product = new Product(req.body);
            await product.save();
            res.json({ product, msg: "Product Added Successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
);

// @route  PUT api/products/:id
// @desc   Update a Product
// @access Private
router.put(
    "/:id",
    [
        check("name", "Product Name Required").not().isEmpty(),
        check("image", "Product Image Required").not().isEmpty(),
        check("color", "Product Color Required").not().isEmpty(),
        check("size", "Product Size Required").not().isEmpty(),
        check("fabric", "Product fabric Required").not().isEmpty(),
        check("availableQuantity", "Available Quantity Required").not().isEmpty(),
        check("rentedQuantity", "Rented Quantity Required").not().isEmpty(),
    ],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const product = await Product.findById(req.params.id);

            product.name = req.body.name;
            product.image = req.body.image;
            product.color = req.body.color;
            product.size = req.body.size;
            product.fabric = req.body.fabric;
            product.availableQuantity = req.body.availableQuantity;
            product.rentedQuantity = req.body.rentedQuantity;

            await Product.updateOne({ _id: req.params.id }, { $set: req.body });
            res.json({ msg: "Product Updated Successfully" });
        } catch (err) {
            console.error(err.message);
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    }
);

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get("/",
    auth,
    async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            console.log(err);
            res.statu(500).send("Server Error!");
        }
    });

// @route  GET api/products/:id
// @desc   Get Product by id
// @access Private
router.get("/:id",
    auth,
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return status(404).json({ msg: "No Product found" });
            }

            res.json(product);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Product found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });



// @route  GET api/products/:name
// @desc   Get Product (Search for product by color)
// @access Private
router.get("/:name",
    auth,
    async (req, res) => {
        try {
            const product = await Product.findById(req.body.color);

            if (!product) {
                return status(404).json({ msg: "No Product found" });
            }

            res.json(product);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Product found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

// @route  DELETE api/products/:id
// @desc   Delete a Product
// @access Private
router.delete("/:id",
    auth,
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ msg: "No Product found" });
            }

            await product.remove();

            res.json({ msg: "Product Successfully Removed" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "No Product found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

module.exports = router;
