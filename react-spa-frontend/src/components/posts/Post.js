import { Favorite, MoreVert, ThumbUp } from '@material-ui/icons'
import './post.css'
import { useState , useEffect, useContext} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Post({post,deletePost}) {
    const [like,setLike]=useState(post.likes.length);
    const [isLike,setIsLike]=useState(false);
    const [user,setUser]=useState({})
    const {user:currentUser} = useContext(AuthContext)
    
    useEffect(()=>{
        setIsLike(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
    
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res=await axios.get(`/user?userId=${post.userId}`)
           setUser(res.data)
        }
        fetchUser();
    },[post.userId])

    const likeHandler=()=>{
        try{
             axios.put("/posts/" + post._id + "/like",{userId:currentUser._id})
        }catch(err){
            console.log(err)
        }
        setLike(isLike?like-1:like+1)
        setIsLike(!isLike)
    }
    
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                    <Link to={`profile/${user.username}`} style={{ textDecoration:"none"}} >
                        <img src={user.profilePicture ? PF + user.profilePicture : PF +  "empty-profile.png"} className="postProfileImg" alt="" />
                    </Link>
                    <Link to={`profile/${user.username}`} style={{ textDecoration:"none",color:"black"}}>
                        <span className="postUserName">{user.username}</span>
                    </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert onClick={()=>deletePost(post)}/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className="likeIcon" htmlColor="blue" onClick={likeHandler}/>
                        <Favorite className="likeIcon" htmlColor="red" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people like it.</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div> 
        </div>
    )
}
