import axios from 'axios'
import { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './register.css'

export default function Register() {
    const username =useRef()
    const email =useRef()
    const password =useRef()
    const passwordAgain =useRef()
    const history = useHistory()
    

    const handleClick =async (e)=>{
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value)
            passwordAgain.current.setCustomValidity("Password don't match")
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try {
                await axios.post("/auth/register",user)
                history.push("/login")
                
            } catch (error) {
                console.log(error)
            }
        }
        
    }
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Together</h3>
                    <span className="registerDesc">Connect with friends and the world around you on Together</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input className="registerInput" placeholder="Username" ref={username} />
                        <input className="registerInput" placeholder="Email" ref={email} type="email"/>
                        <input className="registerInput" placeholder="Password" ref={password} type="password" minLength="6" />
                        <input className="registerInput" placeholder="Confirm Password" ref={passwordAgain} type="password" />
                        <button className="registerButton" type="submit" >Sign Up</button>
                        <Link to="/login" style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}><button className="registerRegisterButton">
                            Log into Account
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
