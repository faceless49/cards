import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import {SuperInputText} from "./components/common/SuperInputText/SuperInputText";
import {SuperButton} from "./components/common/SuperButton/SuperButton";
import {SuperCheckbox} from "./components/common/SuperCheckbox/SuperCheckbox";
import {Login} from "./components/Login/Login";
import {RegistrationContainer} from "./components/Register/RegisterContainer";

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
                <Route path={"/*"} element={<div>404</div>}/>

                <Route path={"/"} element={<div>Main</div>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/registration"} element={<RegistrationContainer/>}/>
                <Route path={"/profile"} element={<div>profile</div>}/>
                <Route path={"/restore"} element={<div>restore</div>}/>
                <Route path={"/newPass"} element={<div>newPass</div>}/>
                <Route path={"/restore"} element={<div>restore</div>}/>
                <Route
                    path={"/test"}
                    element={
                        <div>
                            <SuperInputText/>
                            <SuperButton>Push</SuperButton>
                            <SuperCheckbox/>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
