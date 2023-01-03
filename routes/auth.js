const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { generateAccessToken } = require("../utils/jwtUtil");
const cors=require('cors')

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
     return res.json({ err: "user not found" });
    }
    const isValid = await user.comparePassword(req.body.password);
    console.log(isValid);
    if (!isValid) {
        return  res.json({ err: "invalid password" });
    }
    const userDetails = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = generateAccessToken(userDetails);
    console.log(accessToken);
    res.json({ data: userDetails, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

module.exports = router;
