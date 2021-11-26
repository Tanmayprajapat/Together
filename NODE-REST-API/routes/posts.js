const Post = require('../models/Post');
const User = require('../models/User');

const router = require('express').Router();


///create a post
router.post("/",async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

//update a post
router.put("/:id",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await Post.updateOne({$set:req.body})
            res.status(200).json("post updated succesfully")
        }
        else res.status(403).json("you can update only your post")
    }catch(err){
        res.status(500).json(err)
    }
})

//delete post
router.delete("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await Post.deleteOne()
            res.status(200).json("post deleted successfully")
        }
        else res.status(403).json("you can delete your post only")
    }catch(err){
        res.status(500).json(err)
    }
})

//like or dislike a post 
router.put("/:id/like",async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("The post has been liked")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    }catch(err){
            res.status(500).json(err)
    }
})

//get a post
router.get("/:id",async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

//timeline
router.get("/timeline/:userId",async (req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts=await Post.find({userId:currentUser._id});
        const friendsPost =await Promise.all(
            currentUser.following.map((friendId)=>{
                return Post.find({userId:friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendsPost))
    }catch(err){
        res.status(500).json(err)
    }
}) 

//user's posts on profile
router.get("/profile/:username",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id})
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
}) 


 module.exports=router