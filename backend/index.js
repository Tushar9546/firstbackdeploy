require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {connection} = require("./config/db")
// const  users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("server start")
})

app.use(router);

app.listen(port, async() => {
    try{
        await connection;
        console.log("Connected to db")
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${port}`)
});