import './profile.css'
import Feed from '../../components/Feed'
import Rightbar from '../../components/Rightbar'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import {useContext, useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import { AuthContext } from '../../components/context/AuthContext'
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Profile() {
    // const {user} = useContext(AuthContext)
    const [user,setUser]=useState({})
    const username = useParams().username
    
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res=await axios.get(`/user?username=${username}`)
           setUser(res.data)
        }
        fetchUser();
    },[username])

    return (
        <>
           <Topbar />
           <div className="profile">
               <Sidebar />
               <div className="profileRight">
                   <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF + user.coverPicture : PF +  "noCover.svg"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture ? PF + user.profilePicture : PF +  "empty-profile.png"} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                   </div>
                   <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>

                   </div>
               </div>
           </div>
        </>
    )
}
