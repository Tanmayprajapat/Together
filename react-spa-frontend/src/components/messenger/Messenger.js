import "./messenger.css";
import Topbar from "../Topbar";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
export default function Messenger() {
  const [conversation,setConversation] = useState([])
  const [currentChat,setCurrentChat] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const {user} = useContext(AuthContext);
  const scrollRef = useRef()

  useEffect(()=>{
    const getConversation = async ()=>{
      try {
        const res = await axios.get("/conversation/" + user._id)
        
        setConversation(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversation();
  },[user._id])
  

  useEffect(()=>{
    const getMessages = async ()=>{
        try {
          const res= await axios.get("/message/"+currentChat?._id);
          setMessages(res.data);
        } catch (error) {
          console.log(error)
        }
    }
    getMessages();
  },[currentChat])

  const handleSubmit = async (e)=>{
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId:currentChat._id,
      }
      try {
        const res = await axios.post("/message",message);
        setMessages([...messages,res.data])
        setNewMessage("")
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input className="chatMenuInput" placeholder="Search for friends" />
            {conversation.map((c)=>(
              <div onClick={()=>setCurrentChat(c)}>
                   <Conversation conversation={c} currentUser={user}/>
              </div>
            ))}
         
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          { currentChat ? 
          <>
            <div className="chatBoxTop">
            {messages.map((m)=>(
              <div ref={scrollRef}>
                <Message message={m} own={m.sender === user._id} />
              </div>
            ))}
           
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
                placeholder="write something.."
              />
              <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div>
            </> 
            : (
              <span className="noConversationText">Open a conversation to start a chat</span>
            )
          }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
