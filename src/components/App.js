import {useState} from "react";
import '../App.css';
// import firebase from './firebase/compat/app'
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
// import "firebase/compat/storage"
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
  <>
  <AppRouter isLoggedIn={isLoggedIn}/>
  <footer>&copy; {new Date().getFullYear()}</footer>
  </>
  )
}

export default App;
