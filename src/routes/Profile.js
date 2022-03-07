import React, {useEffect, useState, useRef} from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj, refreshUser}) => {
  const newDisplayNameRef = useRef(null);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (e) => {
    const {target:{value}} = e
    setNewDisplayName(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName) {
        await  updateProfile(authService.currentUser, { 
            displayName: newDisplayName 
        });
        refreshUser();
        newDisplayNameRef.current.value="";
    }
  }

  const getMyNweets = async () => {
    const q = query(
    collection(dbService, "nweets"),
    where("creatorId", "==", userObj.uid),
    orderBy("createdAt", "desc")
    );
    await getDocs(q);
    };

    useEffect(() => {
        getMyNweets();
    }, [])

  return (
    <>
    <form onSubmit={onSubmit}>
      <input type="text" ref={newDisplayNameRef} onChange={onChange} placeholder="Display Name"/>
      <input type="submit" value="Update Profile"/>
      <button onClick={onLogOutClick}>Log Out</button>
    </form>
    </>
  );
};

export default Profile;