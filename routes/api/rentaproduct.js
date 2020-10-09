const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RentedProduct = require("../../models/RentedProducts");
const Customer = require("../../models/Customer");
const { check, validationResult } = require("express-validator");

// @route   POST api/rentedproducts/add
// @desc    Add New Rented Product
// @access  private
router.post(
    "/add",
    [
        check("orderNumber", "Order Number Required").not().isEmpty(),
        check("rentDate", "Delivery Date Required").not().isEmpty(),
        check("returnDate", "Return Date Required").not().isEmpty(),
    ],
    auth,
    async (req, res) => {
        try {
         RentedProduct.find().sort({ orderNumber: -1 }).limit(1).then(async (data) => {
                                newOrderNumber = data[0].orderNumber + 1;
                   var rentedProduct = new RentedProduct({
                        barcodes: req.body.barcodes,
                        orderNumber: newOrderNumber,
                        customer: req.body.customer,
                        rentDate: req.body.rentDate,
                        returnDate: req.body.returnDate
                    });
            
                    await rentedProduct.save();
                })
               

                // await inventory.save();
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
        check("user", "User Name Required").not().isEmpty(),
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
router.get("/", auth,
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
// router.get("/:id",
// // auth,
//     async (req, res) => {
//         try {
//             const rentedProduct = await RentedProduct.findById(req.params.id);

//             if (!rentedProduct) {
//                 return res
//                     .status(404)
//                     .json({ msg: "No Order found" });
//             }

//             res.json(rentedProduct);
//         } catch (err) {
//             console.error(err.message);
//             // Check if id is not valid
//             if (err.kind === "ObjectId") {
//                 return res
//                     .status(404)
//                     .json({ msg: "No Order found" });
//             }
//             res
//                 .status(500)
//                 .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
//         }
//     });



// // @route  GET api/rentedproducts/search/trackingNumber/:trackingNumber
// // @desc   Get Product (Search for Product by trackingNumber)
// // @access Private
// router.get("/search/trackingNumber/:trackingNumber",auth,

// async (req, res) => {
//     try {
//         const rentedProduct = await RentedProduct.findOne({
//             trackingNumber: { $eq: req.params.trackingNumber },
//                  });

//         if (!rentedProduct) {
//             return res
//                 .status(404)
//                 .json({ msg: "No Order found" });
//         }

//         res.json(rentedProduct);
//     } catch (err) {
//         console.error(err.message);
//         // Check if id is not valid
//         if (err.kind === "ObjectId") {
//             return res
//                 .status(404)
//                 .json({ msg: "No Order found" });
//         }
//         res
//             .status(500)
//             .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
//     }
// });

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



// @route  GET api/rentproducts/search
// @desc   Get Cutomer (Search for Customer by number)
// @access Private
router.get('/search',
    //  auth,
    async (req, res) => {
        try {

            const result = await Customer.find({
                contactnumber: { $eq: req.query.number }
            })
            if (!result) {
                return res
                    .status(404)
                    .json({ msg: "No Customer found" });
            }
            return res.json(result);

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



module.exports = router;
