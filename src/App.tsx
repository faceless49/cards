import React from "react";
import './App.css';
import { NavLink, Route, Routes } from "react-router-dom";
import {SuperInputText} from './components/common/SuperInputText/SuperInputText';
import {SuperButton} from './components/common/SuperButton/SuperButton';
import {SuperCheckbox} from './components/common/SuperCheckbox/SuperCheckbox';
import {Login} from "./components/Login/Login";
import {Forgot} from './components/Forgot/Forgot';
import {ApproveEmail} from './components/Forgot/ApproveEmail';


function App() {
  return (
    <div className="App">
      <div>
        <NavLink to={"/"}>Main</NavLink>---
        <NavLink to={"/login"}>Login</NavLink>---
        <NavLink to={"/registration"}>Form Registration</NavLink>---
        <NavLink to={"/profile"}>Profile</NavLink>---
        <NavLink to={"/restore"}>restore</NavLink>---
        <NavLink to={"/newPass"}>newPass</NavLink>---
        <NavLink to={"/restore"}>restore</NavLink>---
        <NavLink to={"/test"}>Test</NavLink>
      </div>
      <Routes>
        <Route path={"/*"} element={<div>404</div>} />

        {/*<Route path={"/"} element={<div>Main</div>} />*/}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/registration"} element={<div>registration</div>} />
        <Route path={"/profile"} element={<div>profile</div>} />
        <Route path={"/newPass"} element={<div>newPass</div>} />
        <Route path={"/restore"} element={<Forgot/>} />
        <Route path={"/approve"} element={<ApproveEmail/>} />
        <Route path={"/test"} element={<div><SuperInputText/><SuperButton>Push</SuperButton><SuperCheckbox/></div>} />
      </Routes>
    </div>
  );
}

export default App;
