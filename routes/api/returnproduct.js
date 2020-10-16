const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RentedProduct = require("../../models/RentedProducts");
const Customer = require("../../models/Customer");
const { check, validationResult } = require("express-validator");
const shortid = require("shortid");




// @route  GET api/returnproducts/searchbyContactNumber
// @desc   Get Order by Customer number
// @access Private
router.get('/searchbyContactNumber',
     auth,
    async (req, res) => {
        try {
            console.log(req.query.number)

            const result = await RentedProduct.find({
                customerContactNumber: { $eq: req.query.number }
            })
            console.log(result)
            if (result == null) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            if (!result ) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            return res.json(result);

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

    // @route  GET api/returnproducts/searchbyOrderNumber
// @desc   Get Order by Customer number
// @access Private
router.get('/searchbyOrderNumber',
auth,
async (req, res) => {
   try {
       const result = await RentedProduct.find({
           orderNumber: { $eq: req.query.orderNumber }
       })
       if (!result) {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       return res.json(result);

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



module.exports = router;
