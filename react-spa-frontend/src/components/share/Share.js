import './share.css'
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Share() {
    const {user}= useContext(AuthContext) 
    const desc = useRef()
    const [file,setFile] = useState(null)
    const submitHandler =async (e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
           
            data.append("name",fileName);
            data.append("file",file)
            newPost.img=fileName;
            try {
                await axios.post("/upload",data)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }

        }
        try {
           await axios.post("/posts",newPost)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(user.profilePicture)
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "empty-profile.png"}
                    
                        alt="" className="shareProfileImg" />
                     </Link>
                    <input placeholder="Write something here.." ref={desc} className="shareInput"  />

                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancel" onClick={()=>setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg" 
                                onChange={(e)=>setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="red" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="#FCBD2C" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        
                    </div>
                    <button className="shareButton" type="submit">Share</button>

                </form>
            </div>
        </div>
    )
}
