const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoute=require('./routes/users')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');
const User = require('./models/User');
const multer = require("multer")
const path = require('path');

const app=express()
dotenv.config();
mongoose.connect(process.env.MONGO_URL,
     {useNewUrlParser:true, useUnifiedTopology: true },
    ()=>{
    console.log("connected to mongodb")
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/images",express.static(path.join(__dirname,"public/images")))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images/")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage})

app.post("/upload",upload.single("file"),(req,res)=>{
    try {
      return  res.status(200).json("File succesfully uploaded")
    } catch (error) {
        console.log(error)
    }
})

app.get("/",(req,res)=>{
    res.send("hii")
})




app.use("/user",userRoute)
app.use("/auth",authRoute)
app.use("/posts",postRoute)
app.use("/conversation",conversationRoute)
app.use("/message",messageRoute)


app.listen(8000,()=> console.log("server is running at port",8000))