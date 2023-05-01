require('dotenv').config();
const express = require("express")
require("./db")
const port = process.env.port || 5000;
const cors =require("cors")
const bodyParser = require("body-parser") ;
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())


app.use(require('./routes/auth'));
app.use(require('./routes/users'));
app.use(require('./routes/post'));



app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.listen(port,()=>{
    console.log("listening on port" + port);
})
