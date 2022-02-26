import {useState} from "react";
import React from "react";
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    } from 'firebase/auth';

const Auth = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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
            if (newAccount) {
                const data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                const data = await signInWithEmailAndPassword(auth, email, password);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            
            <input type="email" name="Email" 
            value={email} onChange={onChange} 
            placeholder="email" required/>
            <input type="password" name="Password" 
            value={password} onChange={onChange} 
            placeholder="password" required/>
            <input type="submit" value={newAccount? "Create Account": "Log In"}/>
            
        </form>    
            <div>
                <button>Login with Google</button>
                <button>Login with Github</button>
            </div>
        </>
    )
}
export default Auth;