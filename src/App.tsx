import React, {useEffect} from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {SuperInputText} from './components/common/SuperInputText/SuperInputText';
import {SuperButton} from './components/common/SuperButton/SuperButton';
import {SuperCheckbox} from './components/common/SuperCheckbox/SuperCheckbox';
import {Register} from "./components/Register/Register";
import axios from "axios";
import {RegisterComponent} from "./components/Register/RegisterComponent";

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

        <Route path={"/"} element={<div>Main</div>} />
        <Route path={"/login"} element={<div>login</div>} />
        <Route path={"/registration"} element={<RegisterComponent/>} />
        <Route path={"/profile"} element={<div>profile</div>} />
        <Route path={"/restore"} element={<div>restore</div>} />
        <Route path={"/newPass"} element={<div>newPass</div>} />
        <Route path={"/restore"} element={<div>restore</div>} />
        <Route path={"/test"} element={<div><SuperInputText/><SuperButton>Push</SuperButton><SuperCheckbox/></div>} />
      </Routes>
    </div>
  );
}

export default App;
