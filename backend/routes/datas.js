const router = require("express").Router();
const Data = require("../models/Data");

router.post("/",async(req,res)=>{
	const newData = new Data(req.body);

	try{
		const saveData = await newData.save();
		res.status(200).json(saveData);
	}catch(err){
		res.status(500).json("Some error")
	}
});

module.exports = router