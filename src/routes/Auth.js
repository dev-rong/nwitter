import {useState} from "react";
import React from "react";
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    GoogleAuthProvider, GithubAuthProvider,
    signInWithPopup} from 'firebase/auth';


const Auth = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const auth = getAuth();
    
    
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
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            //console.log(data)
        }
        catch (error) {
            setError(error.message);
        }
    }

    const onSocialClick = async (e) => {
        const {target: {name}} = e
        let provider;
        if(name==="google"){
           provider = new GoogleAuthProvider();
           const result = await signInWithPopup(auth, provider);
           const credential = GoogleAuthProvider.credentialFromResult(result);     
        }
        else if(name==="github"){
            provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
           const credential = GithubAuthProvider.credentialFromResult(result);
           console.log(credential)
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
            <input type="password" 
            name="password" 
            value={password}
            placeholder="password" 
            required
            onChange={onChange} 
            />
            <input type="submit" value={newAccount? "Create Account": "Sign In"}/>
            {/* {error} */}
        </form>    
            <div>
                <button name="google" onClick={onSocialClick}>Login with Google</button>
                <button name="github" onClick={onSocialClick}>Login with Github</button>
            </div>
        </>
    )
}
export default Auth;