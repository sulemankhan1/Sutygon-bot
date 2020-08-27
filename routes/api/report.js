const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Order = require("../../models/Orders");



// @route  GET api/reports/searchbyDate/:start/:end
// @desc   Get Report (Search for Report by custom date range )
// @access Private
router.get("/searchbyorderDate/:start/:end",auth,
    async (req, res) => {
        start = req.params.start;
        end = req.params.end;
        try {
            const order = await Order.find({
                orderDate: {
                    $gte: start,
                    $lte: end
                }
            });
            if (!order) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }

            res
                .status(200)
                .json(order);
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


// @route  GET api/reports/searchOrder/:customer/:employee/:start/:end
// @desc   Get Order (Search for Order by customer,employee,custom date)
// @access Private
router.get("/searchOrder/:customer/:employee/:start/:end",auth,

    async (req, res) => {
        try {
            const order = await Order.find({
                customer: { $eq: req.params.customer },
                employee: { $eq: req.params.employee },
                orderDate: { $gte: req.params.start, $lte: req.params.end }
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

module.exports = router;
