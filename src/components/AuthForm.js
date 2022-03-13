import React from "react";
import {useState} from "react";
import { authService } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword} from 'firebase/auth';

const AuthForm = ({newAccount, toggleAccount}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   

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

    return (
        <>
        <div>{newAccount? "Sign Up": "Sign In" } with Email and Password</div>
        <form className="auth-form" onSubmit={onSubmit}>          
            <input 
            type="email" 
            name="email" 
            value={email} 
            placeholder="email" 
            required
            onChange={onChange} 
            />
            <input 
            type="password" 
            name="password" 
            value={password}
            placeholder="password" 
            required
            onChange={onChange} 
            />
            <input type="submit" value={newAccount? "Sign Up": "Sign In"}/>
        </form>  
            <div>Got an account? <span onClick={toggleAccount} style={{textDecoration:"underline",cursor:"pointer"}}>
                {newAccount? "Sign In": "Sign Up"}</span></div>
        </>   
    )
}

export default AuthForm