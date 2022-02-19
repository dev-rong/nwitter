import {useState} from "react";
import React from "react";

const Auth = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange=(e)=>{
        const {target:{name, value}} = e;

        if(name==="email"){
            setEmail(value)
        } else if(name==="password"){
            setPassword(value)
        }
    }

    const onSubmit=(e)=>{
        e.preventDefault();
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
            <input type="submit" value="Log In"/>
            
        </form>    
            <div>
                <button>Login with Google</button>
                <button>Login with Github</button>
            </div>
        </>
    )
}
export default Auth;