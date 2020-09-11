const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Verify token and get User
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route   POST api/auth
// @desc    Authenticate User and get Token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Password Required").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // check for existing user
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Email" }] });
      }
      
      if(user.accountStatus === "block"){
        return res
        .status(400)
        .json({ errors: [{ msg: "Your account is blocked" }] });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Password" }] });
      }

      
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
