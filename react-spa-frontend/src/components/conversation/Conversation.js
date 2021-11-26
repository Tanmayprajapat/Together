import axios from "axios"
import { useEffect, useState } from "react"
import "./conversation.css"
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Conversation({conversation,currentUser}) {

    const [user,setUser] = useState(null);

    useEffect(()=>{
    const friendId = conversation.members.find((m) => m !== currentUser._id)

    const getUser = async ()=>{
        try {
            const res = await axios.get("/user?userId="+friendId);
            
            setUser(res);
        } catch (error) {
            console.log(error)
        }
    }
    getUser();
    
},[conversation.members,currentUser._id])




    return (
        <div className="conversation">
            <img src={user &&  user.data.profilePicture ? PF + user.data.profilePicture : PF + "empty-profile.png" }
             className="conversationImg" alt="" />
            <span className="conversationName">{user ? user.data.username : "Fetching.."}</span>
        </div>
    )
}
