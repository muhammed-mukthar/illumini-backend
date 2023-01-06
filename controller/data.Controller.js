const DataModel = require("../models/DataModel");

exports.getDetailController = async (req, res) => {
  try {
    const data = await DataModel.find({
      view: "detail",
      "data.coachId": req.user._id,
    });

    res.json({ data: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.getSummaryController = async (req, res) => {
  try {
    const data = await DataModel.find({
      view: "summary",
      "data.UserId": req.user._id,
    });

    res.json({ data: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.getSnapshotController = async (req, res) => {
  try {
    const datas = await DataModel.aggregate([
      {
        $match: {
          $or: [
            {
              "data.UserId": req.user._id,
            },
            {
              "data.coachId": req.user._id,
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          Total_Associates_Covered: {
            
            $sum: {
              $cond: [
                { $eq: [ "$view", "detail" ] },
                1,
                0
              ]
            }
          },
          Average_Score: {
            $avg: "$data.Avg (Score)",
          },
          Modules_covered: {
            $avg: "$data.No of modules attended",
          },
          Average_Feedback: {
            $avg: "$data.Feedback",
          },
          Assessments_Pending: {
            $sum: {
              $cond: {
                if: {
                  $gt: ["$data.Assessments Pending", 0]
                },
                then: 1,
                else: 0
              }
            }
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
    res.json({ data: datas });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
