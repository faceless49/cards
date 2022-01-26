import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { RegistrationContainer } from "./components/Register/RegisterContainer";
import { Packs } from "./components/Packs/Packs";
import { Forgot } from "./components/Forgot/Forgot";
import { NewPassword } from "./components/NewPassword/NewPassword";
import {ErrorPage} from './components/Error/ErrorPage';
import HeaderMain from "./components/HeaderMain/HeaderMain";

import { Cards } from "./components/Cards/Cards";

function App() {
  return (
    <div className="App">

      <HeaderMain/>

      <Routes>
        <Route path={"/*"} element={<ErrorPage/>} />
        <Route path={"/"} element={<Packs />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Packs />} />
        <Route path={"/cards/:cardsPack_id"} element={<Cards />} />
        <Route path={"/registration"} element={<RegistrationContainer />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/newPass/"} element={<NewPassword />} />
        <Route path={"/restore"} element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
