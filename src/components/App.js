import {useState, useEffect} from "react";
import '../App.css';
import AppRouter from "./AppRouter";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
const [init, setInit] = useState(false); // firebase가 앱을 초기화하길 기다림
//const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userObj, setUserObj] = useState(null)   

useEffect(() => {
    //로그인 상태가 변하면
    onAuthStateChanged(authService, (user) => {
    if (user) {
        // setIsLoggedIn(true);
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
        } else {
        setUserObj(null);      
    }
    // } else {
    //     setIsLoggedIn(false); //렌더링 줄임
    // }
    setInit(true); //앱이 언제 시작해도 onAuthStateChanged가 실행돼야 함
    });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args)
        })
    }

    return(
        <>
            {init ? (
            <AppRouter 
            refreshUser = {refreshUser}
            isLoggedIn = {Boolean(userObj)} 
            userObj = {userObj}/>
             ) : (
                "Initializing..."
             )}
             <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </>
    )
}
export default App
