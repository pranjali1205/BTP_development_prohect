const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const app = express();
// const pinRoute = require("./routes/pins")
// const useRoute = require("./routes/users")
// const DataSchema = require("./routes/datas")
const Trip = require("./rules/trip")

dotenv.config();

app.use(express.json())

mongoose
      .connect(process.env.MONGO_URL, {

            useNewUrlParser: true,
            useUnifiedTopology: true,

      })
      .then(() => {
      	console.log("MongoDb Connected successfully!");
      })
      .catch((err) => console.log(err));

app.use("/api/trip",Trip);
// app.use("/api/users",useRoute);     
// app.use("/api/pins",pinRoute);
// app.use("/api/datas",DataSchema);

app.listen(8800,()=>{
	console.log("Your Server is running.")
});
