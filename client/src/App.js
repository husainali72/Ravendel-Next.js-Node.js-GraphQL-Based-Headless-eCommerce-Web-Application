import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { insertToken } from "./store/action/loginAction";
import Login from "./views/login";
import { client_app_route_url, isEmpty } from "./utils/helper";
import ThemeHelper from "./main-layout";
import "./assets/scss/index.css";
import "./App.css";
import cookie from "react-cookies";
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
      {!isEmpty(login.user_token) && cookie.load("auth").token ?
        <ThemeHelper />
        :
        <Routes>

          <Route
            exact={true}
            path={`${client_app_route_url}login`}
            element={<Login />}
          ></Route>
          <Route path='*' element={<Navigate to={`${client_app_route_url}login`} />} />
        </Routes>
      }
    </>
  );
};

export default App;
