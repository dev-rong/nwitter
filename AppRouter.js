import React, { useState } from "react";
import { HashRouter as BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import ResetPassword from "./ResetPassword";
import Home from "routes/Home";
import Profile from "routes/Profile";
import EmptyPage from "./EmptyPage";
import Navigation from "./Navigation";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route>
            {/* <Route path="*">
              <EmptyPage/>
            </Route> */}
          </>
        ) : (
          <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route exact path="/resetpassword">
            <ResetPassword/>
          </Route>
          </>       
        )}
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;