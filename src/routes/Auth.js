import {useState} from "react";
import React from "react";
import { authService } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider, GithubAuthProvider,
    signInWithRedirect, getRedirectResult} from 'firebase/auth';


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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

    const onSocialClick = async (e) => {
        getRedirectResult(authService)
        const {target: {name}} = e
        let provider;
        if(name==="google"){
           provider = new GoogleAuthProvider();
           const result = await signInWithRedirect(authService, provider);
           GoogleAuthProvider.credentialFromResult(result);     
        }
        else if(name==="github"){
           provider = new GithubAuthProvider();
           const result = await signInWithRedirect(authService, provider);
           GithubAuthProvider.credentialFromResult(result);
        }
    }

    return(
        <>
        <form onSubmit={onSubmit}>          
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
        <div>
            <button name="google" onClick={onSocialClick}>Login with Google</button>
            <button name="github" onClick={onSocialClick}>Login with Github</button>
        </div>
        </>
    )
}
export default Auth;