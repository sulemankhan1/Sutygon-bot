const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator");


var multer  = require('multer')
var upload = multer({ dest: 'client/public/uploads/products' })

const FILE_PATH = 'client/public/uploads/products';

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, FILE_PATH)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })

  var upload = multer({ storage: storage })

// @route   POST api/products/add
// @desc    Add New Product
// @access  private
router.post(
    "/add",
    [
        check("name", "Product Name Required").not().isEmpty(),
        check("image", "Product Image Required").not().isEmpty(),
        check("color", "Product Color Required").isArray().not().isEmpty(),
        // check("size", "Product Size Required").not().isEmpty(),
        // check("fabric", "Product fabric Required").not().isEmpty(),
        // check("availableQuantity", "Available Quantity Required").not().isEmpty(),

    ],
    auth,
    upload.single('image'),
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res
        //         .status(422)
        //         .json({ errors: errors.array() });
        // }
    const body = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    
        try {
            const productBody = {
                name: body.name,
                image: `/uploads/products/${req.file.originalname}`,
                color: JSON.parse(req.body.color),
              };
         
            let product = new Product(productBody);
            await product.save();
            res.json({ product,msg: "Product Added Successfully" });
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server error");
        }
    }
);



// @route  POST api/products/barcode_update/:id
// @desc   Update a Product for Barcode
// @access Private
router.post(
    "/barcode_update/:id",
    auth,
    async (req, res) => {
        try {
           const body = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    
            await Product.updateOne({ _id: req.params.id }, {
                $set: {
                    color: body.color,
                }
            });
            res
                .json({ msg: "Barcode Added Successfully" });
        } catch (err) {
            console.error(err.message);
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    }
);

// @route  POST api/products/:id
// @desc   Update a Product
// @access Private
router.post(
    "/:id",
    [
        check("name", "Product Name Required").not().isEmpty(),
        check("image", "Product Image Required").not().isEmpty(),
        check("color", "Product Color Required").not().isEmpty(),
        check("size", "Product Size Required").not().isEmpty(),
        check("fabric", "Product fabric Required").not().isEmpty(),
        check("availableQuantity", "Available Quantity Required").not().isEmpty()
    ],
    auth,
    upload.single('image'),
    async (req, res) => {
        try {
           const body = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    
            await Product.updateOne({ _id: req.params.id }, {
                $set: {
                    name: body.name,
                    image: `/uploads/products/${req.file.originalname}`,
                    color: body.color,
                    fabric: body.fabric,
                    size: body.size,
                    availableQuantity: body.availableQuantity
                }
            });
            res
                .json({ msg: "Product Updated Successfully" });
        } catch (err) {
            console.error(err.message);
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    }
);


// @route  POST api/products/:id
// @desc   Update a Product
// @access Private
router.post(
    "/updateQty/:id",
    [
        check("availableQuantity", "Available Quantity Required").not().isEmpty()
    ],
    auth,
    // upload.single('image'),
    async (req, res) => {
        try {
           const body = req.body; // req.body = [Object: null prototype] { title: 'product' }
            await Product.updateOne({ _id: req.params.id }, {
                $set: {
                    availableQuantity: body.availableQuantity
                }
            });
            res
                .json({ msg: "Product Updated Successfully" });
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
router.get("/", auth,

    async (req, res) => {
        try {
            const products = await Product.find();
            res
                .status(200)
                .json(products);
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server Error!");
        }
    });

    
// @route   GET api/products/search/search val
// @desc    Search products
// @access  Private
router.get("/search/:val", auth,

async (req, res) => {
    try {
        const search = req.params.val;
        const products = await Product.find({
            $or: [
              {name: search},
              {color: search},
              {size: search},
              {fabric: search},
              {availableQuantity: search},
              {rentedQuantity: search},
            ]
          });
        res
            .status(200)
            .json(products);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send("Server Error!");
    }
});

// @route  GET api/products/:id
// @desc   Get Product by id
// @access Private
router.get("/:id",auth,
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res
                    .status(404)
                    .json({ msg: "No Product found" });
            }

            res.json(product);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Product found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });



// @route  GET api/products/:name
// @desc   Get Product (Search for product by name)
// @access Private
router.get("/:name",
    auth,
    async (req, res) => {
        try {
            const product = await Product.findOne({ name: { $eq: req.params.name } });

            if (!product) {
                return res
                    .status(404)
                    .json({ msg: "No Products found" });
            }
            res
                .status(200)
                .json(product);

        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Product found" });
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
    
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res
                    .status(404)
                    .json({ msg: "No Product found" });
            }

            await product.remove();

            res
                .status(200)
                .json({ msg: "Product Successfully Removed" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Product found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });



// @route   GET api/products/search/search val
// @desc    Search products
// @access  Private
router.get("/searchBarcode/:val", auth,

async (req, res) => {
    try {
        const search = req.params.val;
        const products = await Product.find({
            $or: [
              {'color.sizes..barcodes..barcode': search},
             ]
          });

        res
            .status(200)
            .json(products);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send("Server Error!");
    }
});

    module.exports = router;
