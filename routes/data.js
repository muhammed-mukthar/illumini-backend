const router = require("express").Router();
const { getDetailController, getSummaryController, getSnapshotController } = require("../controller/data.Controller");
const { VerifyToken } = require("../middleware/jwtValidate");


router.get("/summary", VerifyToken, getSummaryController);

router.get("/detailed", VerifyToken, getDetailController);

router.get("/snapshot", VerifyToken,getSnapshotController);
module.exports = router;
