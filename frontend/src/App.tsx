import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ChangeCrawl from "./pages/Changecrawl";
import MakeCrawl from "./pages/Makecrawl";
import Log from "./pages/Logprofile";
import SettingProfile from "./pages/Settingprofile";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Specificcrawling from "./pages/Specificcrawling";
import UserProfile from "./pages/Userprofile";
import notFound from "./pages/404";
import "./App.css";

function App() {
  let arr:any = [];
  // arr.map((item) => data.push(item))
  // localStorage.setItem("tagarr", JSON.stringify(arr));
  // console.log(localStorage.getItem("tagarr"));
  // console.log(JSON.parse(localStorage.getItem("tagarr")));
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/changecrawl/:id" component={ChangeCrawl} />
        <Route exact path="/makecrawl" component={MakeCrawl} />
        <Route exact path="/log" component={Log} />
        <Route exact path="/settingprofile" component={SettingProfile} />
        <Route exact path="/specificcrawling/:id" component={Specificcrawling} />
        <Route exact path="/userprofile" component={UserProfile} />
        <Route path="*" component={notFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
