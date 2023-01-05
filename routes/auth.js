const { LoginController } = require("../controller/auth.Controller");

const router = require("express").Router();


router.post("/login",LoginController);



module.exports = router;
