const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { generateAccessToken } = require("../utils/jwt");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ data: "user not found" });
    }
    const isValid = await user.comparePassword(req.body.password);
    console.log(isValid);
    if (!isValid) {
      res.status(404).json({ data: "invalid password" });
    }
    const userDetails = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = generateAccessToken(userDetails);
    console.log(accessToken);
    res.json({data:"user successfully login",accessToken:accessToken});
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

module.exports = router;
