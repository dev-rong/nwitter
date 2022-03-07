import React from "react";
import { authService } from "fbase";
import {
    GoogleAuthProvider, GithubAuthProvider,
    signInWithRedirect, getRedirectResult} from 'firebase/auth';
import AuthForm from "components/AuthForm";

const Auth = () => {

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
        <><AuthForm />
        <div>
            <button name="google" onClick={onSocialClick}>Login with Google</button>
            <button name="github" onClick={onSocialClick}>Login with Github</button>
        </div>
        </>
    )
}
export default Auth;