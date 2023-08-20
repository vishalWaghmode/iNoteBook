const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //this is used to add the salt iin the database so anyone cannot hack our password
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//jwt is the ecure connection betweeen the client and server
const JWT_SECRET = "Vishalis@goodboy";

 //by this token we can asssign the token

//ROUTE 1:create a user using : POST "/api/auth/createuser". does not require authentification . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are error returns bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //check whether the user with this email exists alrrady
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exist" });
      }

      //this will not give the password in the databsse but will give the salt of that password
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: "Please eneter the unique value", message: err.message})})
      // res.json(user)
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 2: Authentification of the ser using POST="/api/auth/createUser", No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //comparing the password win the db with the password eneterd by the user

      const passwordCompare = await bcrypt.compare(password, user.password);

      //if the password does not get matched
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      //here the data is the data which is been send to the user after the successful login
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Inetrnal Server Error");
    }
  }
);

//ROUTE 3: Getting the user details of logged in users using POST="/api/auth/getuser",login required
//for doing so we have to show the all the fields of the data which we want and have to decode the authtoken bcoz all the data is present in the authtoken only

//middleware is the function which will be called when the login credentials are been done
//when the fetchuser will run the function above it will get called i.e async (req, res) 
router.post("/getuser", fetchuser , async (req, res) => {
    try {
      userId = req.user.id;
      //select(-"-password") this will select the all the fields except the password fileld
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Inetrnal Server Error");
    }
  }
);
module.exports = router;
