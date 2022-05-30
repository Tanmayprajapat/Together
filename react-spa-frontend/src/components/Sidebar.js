import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilled,Notifications, RssFeed, School, WorkOutline,Person  } from '@material-ui/icons'
import './sidebar.css'
import {Users} from '../dummyData'
import CloseFriend from './closeFriend/CloseFriend'
import { Link } from "react-router-dom";
import Online from './online/Online'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends,setFriends]= useState([])
    
    const {user:currentUser} = useContext(AuthContext)
    const [followed,setFollowed] = useState()
    const { user } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link className="link" to={"/profile/" + user.username}>
                            <img
                                src={
                                    user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "empty-profile.png"
                                }
                                alt=""
                                className="sidebarProfileImage sidebarIcon"
                            />
                            <span className="sidebarListItemText">Profile</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link  className="link" to={"/notification"}>
                            <Notifications className="sidebarIcon"/>
                            <span className="sidebarListItemText">Notifications</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link  className="link" to={"/requests/"}>
                            <Person className="sidebarIcon"/>
                            <span className="sidebarListItemText">Requests</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link  className="link" to={"/"}>
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">Feed</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link  className="link" to={"/messenger/"}>
                            <Chat className="sidebarIcon" />
                            <span className="sidebarListItemText">Chats</span>
                        </Link>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map((u)=>
                                <Online key={u.id} user={u} />
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
