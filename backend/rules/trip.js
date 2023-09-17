const router = require("express").Router();
const Trip = require("../dataclass/Trip");

router.post("/",async(req,res) =>{
	const newdata = new Trip(req.body);

	try{
		const savedata = await newdata.save();
		res.status(200).json(savedata);
	}catch(err){
		res.status(500).json(err)
	}
});

module.exports = router