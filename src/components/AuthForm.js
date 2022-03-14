import React, {useState} from "react";
import {Link} from "react-router-dom";
import { authService } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
        } from 'firebase/auth';
import ResetPassword from './ResetPassword';
import Eye from "icon/Eye";
import EyeOff from "icon/EyeOff";

const AuthForm = ({newAccount}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [showPW, setShowPW] = useState("password");  

    const onChange = (e) =>{
        const {target:{name, value}} = e;
        if(name === "email"){
            setEmail(value)
        } else if(name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (e) =>{ 
        e.preventDefault();
        try {
            if (newAccount) {
                await createUserWithEmailAndPassword(authService, email, password);
            } else {
                await signInWithEmailAndPassword(authService, email, password);
            }
        }
        catch (error) {
            setError(error.message);
        }
    }

    const showPassword = () => {
        showPW==="password"? setShowPW("text"):setShowPW("password")
    }

    return (
        <> 
        <form className="auth__form" onSubmit={onSubmit}>          
            <label for="email">Email address</label>
            <input className="auth__form--input"
            id="email" 
            type="email" 
            name="email" 
            value={email}              
            required
            onChange={onChange} 
            />
            <div className="position-relative">
            <label for="password">Password
                <span className="auth__form--link link">
                <Link to="/resetpassword">{newAccount? "":"Forgot password?"}</Link>
                </span>
            </label>
            </div>
            <input className="auth__form--input"
            id="password" 
            type={showPW} 
            name="password" 
            value={password}            
            required
            onChange={onChange} 
            />
            <label>
                <input type="checkbox" onChange={showPassword}/>
                {showPW==="password"? "Show" : "Hide"} Password
            </label>

            <input className="btn-m bg-accent clr-primary" type="submit" value={newAccount? "Sign up": "Sign in"}/> 
        </form>  
        </>   
    )
}

export default AuthForm