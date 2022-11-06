const express = require("express");
const router = express.Router();
const {users} = require("../models/userSchema");


router.post("/register",async(req,res)=>{
    console.log(req.body);
    const {name,email,age,mobile,work,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.send("plz fill the data");
    }

    try {

        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.send("this  user is already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            res.json({msg: "signup sucessfull"});
            console.log(adduser);
        }

    } catch (error) {
        res.send(error);
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.send(userdata)
        console.log(userdata);
    } catch (error) {
        res.send(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.send(userindividual)

    } catch (error) {
        res.send(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.send(updateduser);

    } catch (error) {
        res.send(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.send(deletuser);

    } catch (error) {
        res.send(error);
    }
})




module.exports = router;
