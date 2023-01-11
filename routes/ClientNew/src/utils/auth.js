import cookie from "react-cookies";
import {client_app_route_url} from '../utils/helper';

//var user_token = JSON.parse(localStorage.getItem("auth")) || {};
var user_token = cookie.load("auth");
const getToken = () => {
  if (!cookie.load("auth")) return false;
  //console.log(cookie.load("auth"));
  return cookie.load("auth").token;
};
const getUserId = () => {
  return user_token.user_id;
};

const getUser = () => {
  return user_token;
};

const setUserToken = (new_token) => {
  cookie.save("auth", new_token);
  //localStorage.setItem("auth", JSON.stringify(new_token));
};

const logout = () => {
  //localStorage.removeItem("auth");
  cookie.remove("auth");
  window.location.pathname = `${client_app_route_url}login`;
};

export default {
  user_token,
  getToken,
  getUser,
  getUserId,
  setUserToken,
  logout,
};
