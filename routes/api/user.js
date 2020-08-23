const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");



// @route   GET /api/users/id
// @desc    Get User by Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return status(404).json({ msg: "No user found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No User found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});


// @route   GET /api/users/updatePassword/:id
// @desc    Update Password
// @access  Private

router.put(
  "/updatepassword/:id",
  [
    check("currentpassword", "Current Password Field Required").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } 

      const user = await User.findById(req.params.id);
      const isMacth = await bcrypt.compare(req.body.currentpassword, user.password);
    
      if (!isMacth) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Password" }] });
      }

      if (req.body.newpassword!==req.body.confirmpassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Confirm Password didn't match" }] });
      }
      const salt = await bcrypt.genSalt(10);

     newpass = await bcrypt.hash(req.body.newpassword, salt);
  

      await User.updateOne({ _id: req.params.id }, { $set: {
        password:newpass
      } });
      res.json({ type: 'success',msg: "Password Updated Successfully" });
    } catch (err) {

     
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  PUT api/users/:id
// @desc   Update a user
// @access Private
router.put(
  "/:id",
  [
    check("name", "Full Name Field Required").not().isEmpty(),
    check("email", "Email Field Required").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // prepare student object
      const user = await User.findById(req.params.id);

    //   CHANGE FIELDS ACCORDING TO OURS
        // record.rollNumber = req.body.rollNumber;
        // record.batch = req.body.batch;

      await user.save();
      
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  PUT api/users/changestatus/:id
// @desc   Change Account status (blocked/active)
// @access Private
router.put(
  "/changestatus/:id",
  [check("status", "Please Provide a Required").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await User.findById(req.params.id);

      user.accountStatus = req.body.accountStatus;

      await user.save();
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  DELETE api/users/:id 
// @desc   Delete a user
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const course = await User.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "No Course found" });
    }


    // Delete user Document
    const record = await User.findById(req.params.id);
    await record.remove();

    res.json({ msg: `Account Removed successfully` });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No User found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});


// @route   GET api/users/forgetpassword/email
// @desc    Validate Email and Get Token
// @access  Private


router.get(
  "/forgetpassword/:email",
  [
    check("email", "Please Enter a Valid Email").isEmail(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email } = req.params;
    try {
      // check for existing user
      let user = await User.findOne({ email });
  
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Email" }] });
      }
      
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 300000 },
        (err, token) => {
         
          if (err) throw err;
        
         
          if (token) {
            return res
              .status(200)
              .json({token: token})
          }
              
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/resetpassword/reset_token
// @desc    Reset Password
// @access  Public

router.post(
  "/resetpassword",
  async (req, res) => {
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
   
    try {
      const user_id = jwt.verify(req.body.resetToken, config.get("jwtSecret"));  
      //  check for existing user
   let user = await User.findById(user_id.user.id);
   if (!user) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid Credentials" }] });
  }
   const password = req.body.newpassword;
   
   const salt = await bcrypt.genSalt(10);
   
   newpassword= await bcrypt.hash(req.body.newpassword, salt);
 
    const userID  = user._id;
      
      await User.updateOne({_id:userID}, { $set:{
        password:newpassword
      } });
      res.json({ msg: "Password Updated Successfully" });
     
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;