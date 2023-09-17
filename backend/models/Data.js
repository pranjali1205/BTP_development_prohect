const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({

	routeid:{
		type:Number,
		required: true,
	},
	serviceid:{
		type:Number,
		required:true,
	},
	tripid:{
		type:Number,
		required:true,
	},
},
{
	timestamps:true,
});

module.exports = mongoose.model("Data",DataSchema);