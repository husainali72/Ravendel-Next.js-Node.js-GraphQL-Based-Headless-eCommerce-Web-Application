import React, { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "./utils/helper";
import { registerNav } from "./utils/navigation";
import { insertToken } from "./store/action/loginAction";
import MainLayout from "./main-layout";
import Login from "./views/login";
import { client_app_route_url } from "./utils/helper";
import "./assets/scss/index.css";
import "./App.css";
import SideBarTheme from "./main-layout/Sidebar";
import Dashboard from "./views/dashboard";
import AllRoutes from "./routes/routes";
import ThemeHelper from "./main-layout";

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(insertToken());
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading.....</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          exact={true}
          path={`${client_app_route_url}login`}
          element={<Login/>}
        ></Route>
        
      </Routes> 
      <ThemeHelper />
    </>
  );
 };

export default App;

