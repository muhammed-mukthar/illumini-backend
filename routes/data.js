const router = require("express").Router();
const { VerifyToken } = require("../middleware/jwtValidate");
const DataModel=require('../models/DataModel')


router.get('/summary',VerifyToken,async(req,res)=>{
    try{
   const data=await DataModel.find({"data.UserId":req.user._id})
 res.json({data:data})
    }catch(err){
        res.status(500).json({err:err})
    }

})
router.get('/detailed',VerifyToken,async(req,res)=>{
    try{
   const data=await DataModel.find({"data.coachId":req.user._id})
 res.json({data:data})
    }catch(err){
        res.status(500).json({err:err})
    }

})


router.get('/snapshot',VerifyToken,async(req,res)=>{
    try{
const datas=await DataModel.aggregate([
    {
      '$match': {
        '$or': [
          {
            'data.UserId': '61656e4cb35631eb12586a11'
          }, {
            'data.coachId': '61656e4cb35631eb12586a11'
          }
        ]
      }
    }, {
      '$group': {
        '_id': null, 
        'totalAssociatesCovered': {
          '$sum': '$data.N(Associates attended)'
        }, 
        'averageScore': {
          '$avg': '$data.Avg (Score)'
        }, 
        'modulescovered': {
          '$sum': '$data.No of modules attended'
        }, 
        'averageFeedback': {
          '$avg': '$data.Feedback'
        }, 
        'AssessmentsPending': {
          '$sum': '$data.Assessments Pending'
        }, 
        'studentsLevelA': {
          '$sum': {
            '$cond': {
              'if': {
                '$eq': [
                  '$data.Student Level', 'A'
                ]
              }, 
              'then': 1, 
              'else': 0
            }
          }
        }, 
        'studentsLevelB': {
          '$sum': {
            '$cond': {
              'if': {
                '$eq': [
                  '$data.Student Level', 'B'
                ]
              }, 
              'then': 1, 
              'else': 0
            }
          }
        }, 
        'studentsLevelC': {
          '$sum': {
            '$cond': {
              'if': {
                '$eq': [
                  '$data.Student Level', 'C'
                ]
              }, 
              'then': 1, 
              'else': 0
            }
          }
        }
      }
    }
  ])

  console.log(datas);
  res.json({data:datas})
    }catch(err){
        res.status(500).json({err:err})
    }
})
module.exports = router;
