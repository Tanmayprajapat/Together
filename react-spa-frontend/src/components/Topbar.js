import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./topbar.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Together</span>
          </Link>
        </div>
        <div className="topbarRight">
          <div className="searchBar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friends,post or video"
              className="searchInput"
            ></input>
          </div>
        </div>

        {/* <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <Link to={"/requests/"} className="requestIcon">
              <div className="topbarIconItem">
                <Person />
                <span className="topbarIconBadge">1</span>
              </div>
            </Link>
            <Link to={"/messenger/"} className="messageIcon">
              <div className="topbarIconItem">
                <Chat />
                <span className="topbarIconBadge">1</span>
              </div>
            </Link>
            <Link to={"/notification"} className="notificationIcon">
              <div className="topbarIconItem">
                <Notifications />
                <span className="topbarIconBadge">1</span>
              </div>
            </Link>
          </div>
          <Link to={"/profile/" + user.username}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "empty-profile.png"
              }
              alt=""
              className="topbarImage"
            />
          </Link>
        </div> */}
      </div>
    </div>
  );
}
