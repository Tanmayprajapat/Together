const router = require('express').Router();
const bcrypt =require("bcrypt")

const User=require('../models/User');


//register user
router.post("/register",async (req,res)=>{

    const hashPassword=await bcrypt.hash(req.body.password,10)

    const newUser=await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
    })
    try{
    const user=await newUser.save()
    res.status(200).send(user)
    } catch(err){
        console.log(err)
    }
})


//login user
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found")

        const validPassword=await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(404).json("Wrong password")

        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err.message)
    }
})

module.exports =router