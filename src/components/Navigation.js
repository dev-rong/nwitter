import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { authService } from "fbase";
import HomeIcon from "icon/HomeIcon";
import HomeOffIcon from "icon/HomeOffIcon";
import UserIcon from "icon/UserIcon";
import UserOffIcon from "icon/UserOffIcon";
import LogoutIcon from "icon/LogoutIcon";
import logo from 'img/blue-logo.png'

const Navigation = ({userObj}) => {
  
  const history = useHistory();
  const onLogOutClick = () => {
    const ok = window.confirm("Are you sure you want to logout?")
    if(ok) {
      authService.signOut();
      history.push("/");
    }
  };

  return (
  <nav className="nav">
    <ul className="nav__list" role="list">
      <li role="list">
        <Link to="/"><img src={logo} width="25px" height="25px"/>Home</Link>
      </li>
      <li role="list">
        <Link to="/profile">
          {userObj.displayName} Profile
          </Link>
      </li>
      <li role="list">
        <span className="link" onClick={onLogOutClick}><LogoutIcon/></span>Log Out
      </li>
    </ul>
  </nav>
  )
}
export default Navigation;