const mongoose = require("mongoose");

const DB = "mongodb+srv://sarthak:20112002@cluster0.w4r2isl.mongodb.net/test"
// process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})