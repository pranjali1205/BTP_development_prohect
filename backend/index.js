const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins")
const useRoute = require("./routes/users")

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


app.use("/api/users",useRoute);     
app.use("/api/pins",pinRoute);


app.listen(8800,()=>{
	console.log("Backend server is running so be chill")
});
