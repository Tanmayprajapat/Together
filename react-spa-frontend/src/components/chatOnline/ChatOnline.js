import "./chatOnline.css"

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Benjamin</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Boris</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Anthony</span> 
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="/assets/4.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Andrew</span> 
            </div>
        </div>
    )
}
