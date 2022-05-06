import './login.css'
import {useContext, useRef} from 'react'
import { loginCall } from '../../apiCalls'
import {Link} from "react-router-dom"
import { AuthContext } from '../../components/context/AuthContext'
import { CircularProgress } from '@material-ui/core'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user,isFetching,error,dispatch} = useContext(AuthContext)

    const handleClick= async (e)=>{
        e.preventDefault();
       const r =  await loginCall({email:email.current.value,password:password.current.value},dispatch);
       console.log(r);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Together</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Together</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input className="loginInput" placeholder="Email" type="email" ref={email} required/>
                        <input className="loginInput" placeholder="Password" type="password" ref={password} required minLength="6" />
                        <button className="loginButton">{isFetching ? <CircularProgress color="white" size="18px"/> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}><button className="loginRegisterButton">
                        {isFetching ? <CircularProgress color="white" size="18px"/> : "Create a New Account"}
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
