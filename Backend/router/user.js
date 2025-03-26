const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userAuth");

// sign up

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //check username length morthan than 4

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "usernsme length should be gresther thsn 3" });
    }
    if (!email.includes("@")) {
      email = email + "@gmail.com";
  }
    //check username alrady exixt
    const existingusername = await User.findOne({ username: username });
    if (existingusername) {
      return res.status(400).json({ message: "usernsme alrady exist" });
    }
    //check email alrady exixt
    const existingemail = await User.findOne({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "email alrady exist" });
    }
    //password length lessthan = 6

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password length should be gresther thsn 5" });
    }
    const hasPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hasPass,
      address: address,
      role:"user"
    });
    await newUser.save();
    return res.status(200).json({ message: "signUp Successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

// sign in

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existinguser = await User.findOne({ username });


    if (!existinguser) {
      return res.status(400).json({ message: "Invalide credentials" });
    }
    await bcrypt.compare(password, existinguser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existinguser.username },
          { role: existinguser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existinguser._id,
          role: existinguser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalide credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//get-user-information

router.get("/get-user-information", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password ");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//update address
router.put("/update-address", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "address updated succressFully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
