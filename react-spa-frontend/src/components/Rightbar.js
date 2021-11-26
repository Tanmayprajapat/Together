import { Add, Cake, Remove } from '@material-ui/icons'
import './rightbar.css'
import {Users} from '../dummyData'
import Online from './online/Online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

export default function Rightbar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends,setFriends]= useState([])
    
    const {user:currentUser} = useContext(AuthContext)
    const [followed,setFollowed] = useState()
    

    useEffect(()=>{
        setFollowed(currentUser.following.includes(user?.id))
    },[currentUser,user])

    useEffect(()=>{
        
        const getFriends = async ()=>{
            try{
                const friendList = await axios.get("/user/friends/" + user._id)
                setFriends(friendList.data);
            }catch (err){
                console.log(err)
            }
        };
        getFriends();
    },[user])

    const handleClick = async () =>{
        try {
            if(followed)
                await axios.put("/user/" + user._id + "/unfollow",{userId:currentUser._id} )
            else
                await axios.put("/user/" + user._id + "/follow",{userId:currentUser._id} )

        } catch (error) {
            console.log(error)
        }
       setFollowed(!followed)
    }

    const HomeRightBar=()=>{
        return (
            <>
                <div className="birthdayContainer">
                    <Cake htmlColor="#e012c1" fontSize="large" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>John Wick</b> and <b>3 other friends</b> have birthday today
                    </span>
                </div>
                <img src="/assets/4.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map((u)=>
                                <Online key={u.id} user={u} />
                        )
                    }
                    
                </ul>
            </>
        )
    }

    const ProfileRightBar=()=>{
        return (
           <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add /> }
                </button>
            )}
             <h4 className="profilerightbarTitle" >User information</h4>
             <div className="rightbarInfo">
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">City:</span>
                     <span className="rightbarInfoValue">{user.city}</span>
                 </div>
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">From:</span>
                     <span className="rightbarInfoValue">{user.from}</span>
                 </div>
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">Relationship:</span>
                     <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship ===2 ? "Married" : ""}</span>
                 </div>
             </div>
             <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
             
                    {friends.map((friend)=>(
                        <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
                        <div className="rightbarFollowing">
                            <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "/empty-profile.png"} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName"> {friend.username}</span>
                        </div>
                        </Link> 
                        
                ))}
                
             </div>
           </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar />: <HomeRightBar />}
            </div>
        </div>
    )
}
