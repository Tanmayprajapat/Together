import "./chatOnline.css"

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Tanmay</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Dhairya</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Adnan</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Pw</span> 
            </div>
        </div>
    )
}
