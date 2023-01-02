const router = require("express").Router();
const DataModel=require('../models/DataModel')
const UserModel=require('../models/UserModel')
router.get('/',async(req,res)=>{
const data=await DataModel.find({view:'detail'})
res.json({data:data})
});

router.post('/',async(req,res)=>{
    const data=await UserModel.create(req.body)
    res.json(data)
})

module.exports = router;
