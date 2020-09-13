const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
var multer  = require('multer')
var upload = multer({ dest: 'client/public/uploads/user' })

const FILE_PATH = 'client/public/uploads/user';

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

// router.post('/test', upload.single('avatar'), function (req, res, next) {
//   console.log(req.file)
//   console.log(req.body)
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
// })
// @route   POST /api/users/add
// @desc    Add new user
// @access  Private


router.post("/add",
  [
    check("username", "User Name is Required").not().isEmpty(),
    check("fullname", "Full Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Password is Required").not().isEmpty(),
    check("contactnumber", "Please Enter Contact Number").not().isEmpty(),
    check("gender", "Please select your Gender").not().isEmpty(),
    check("password", "Please Enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  auth,
  upload.single('avatar'),
    async (req, res) => {

    const body = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(body.password, salt);

    try {
      // check if there is any record with same email
      const rec = User.find({ email: body.email });
      // save user record
      // const { avatar } = file.path;
      const userBody = {
        username: body.username,
        fullname: body.name,
        email: body.email,
        password: password,
        gender: body.gender,
        contactnumber: body.contactnumber,
avatar:`/uploads/user/${req.file.originalname}`,
      };
      let user = new User(userBody);
      await user.save();

      res
        .status(200)
        .json({user, msg: "User Added Successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Server error");
    }

},
)



// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get("/", auth,
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Server Error!");
    }
  });

// @route   GET /api/users/id
// @desc    Get User by Id
// @access  Private
router.get("/:id", auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ msg: "No user found" });
      }

      res
        .status(200)
        .json(user);
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

// @route  PUT api/users/:id
// @desc   Update a user
// @access Private
router.post(
  "/:id",
  [
    check("name", "Full Name Field Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("contactNumber", "Please Enter Contact Number").not().isEmpty(),
    check("gender", "Please select your Gender").not().isEmpty(),

  ],
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const body = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
      await User.updateOne({ _id: req.params.id }, {
        $set: {
          username: body.username,
          fullname: body.name,
          email: body.email,
          gender: body.gender,
          contactnumber: body.contactnumber,
  avatar:`/uploads/user/${req.file.originalname}`,
        }
      });

      res
        .status(200)
        .json({ msg: "User Updated Successfully" });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  POST api/users/changestatus/:id
// @desc   Change Account status (blocked/active)
// @access Private
router.post(
  "/changestatus/:id",
  // [check("accountStatus", "Please Provide a Required").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json({ errors: errors.array() });
      }

      const user = await User.findById(req.params.id);

      await User.updateOne({_id: user._id }, {
        $set:
        {
          accountStatus: "block"
        }
      });
      res
        .status(200)
        .json({ msg: "Status Updated Successfully" });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);


// @route   POST /api/users/updatePassword/:id
// @desc    Update Password
// @access  Public

router.post(
  "/updatepassword/:id",
  [
    check("currentpassword", "Current Password Field Required").not().isEmpty(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json({ errors: errors.array() });
      }

      const user = await User.findById(req.params.id);
      const isMacth = await bcrypt.compare(req.body.currentpassword, user.password);

      if (!isMacth) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Password" }] });
      }

      if (req.body.newpassword !== req.body.confirmpassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Confirm Password didn't match" }] });
      }
      const salt = await bcrypt.genSalt(10);

      newpass = await bcrypt.hash(req.body.newpassword, salt);


      await User.updateOne({ _id: req.params.id }, {
        $set: {
          password: newpass
        }
      });
      res
        .json({ type: 'success', msg: "Password Updated Successfully" });
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
router.delete("/:id",auth, async (req, res) => {
  try {

    // Delete user Document
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "No User found" });
    }
    await user.remove();

    res
      .status(200)
      .json({ msg: `Account Removed successfully` });
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
      return res
        .status(422)
        .json({ errors: errors.array() });
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
              .json({ token: token })
          }

        }
      );
    } catch (err) {
      res
        .status(500)
        .send("Server error");
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
      return res
        .status(422)
        .json({ errors: errors.array() });
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

      newpassword = await bcrypt.hash(req.body.newpassword, salt);

      const userID = user._id;

      await User.updateOne({ _id: userID }, {
        $set: {
          password: newpassword
        }
      });
      res
        .status(200)
        .json({ msg: "Password Updated Successfully" });

    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Server error");
    }
  }
);



module.exports = router;
