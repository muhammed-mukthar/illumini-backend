const router = require("express").Router();
const { VerifyToken } = require("../middleware/jwtValidate");
const DataModel = require("../models/DataModel");

router.get("/summary", VerifyToken, async (req, res) => {
  try {
    const data = await DataModel.find({
      view: "summary",
      "data.UserId": req.user._id,
    });

    res.json({ data: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.get("/detailed", VerifyToken, async (req, res) => {
  try {
    const data = await DataModel.find({
      view: "detail",
      "data.coachId": req.user._id,
    });

    
    res.json({ data: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.get("/snapshot", VerifyToken, async (req, res) => {
  try {
    const datas = await DataModel.aggregate([
      {
        $match: {
          $or: [
            {
              "data.UserId": "61656e4cb35631eb12586a11",
            },
            {
              "data.coachId": "61656e4cb35631eb12586a11",
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          Total_Associates_Covered: {
            $sum: "$data.N(Associates attended)",
          },
          Average_Score: {
            $avg: "$data.Avg (Score)",
          },
          Modules_covered: {
            $sum: "$data.No of modules attended",
          },
          Average_Feedback: {
            $avg: "$data.Feedback",
          },
          Assessments_Pending: {
            $sum: "$data.Assessments Pending",
          },
          Level_A_Student: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$data.Student Level", "A"],
                },
                then: 1,
                else: 0,
              },
            },
          },
          Level_B_Student: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$data.Student Level", "B"],
                },
                then: 1,
                else: 0,
              },
            },
          },
          Level_C_Student: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$data.Student Level", "C"],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ]);

    console.log(datas);
    res.json({ data: datas });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});
module.exports = router;
