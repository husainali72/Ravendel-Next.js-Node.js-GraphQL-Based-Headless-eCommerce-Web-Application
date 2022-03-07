import cookie from "react-cookies";

var user_token = cookie.load("customer_auth");
const getToken = () => {
  return user_token && user_token.token ? user_token.token : '';
};
const getUserId = () => {
  return user_token.user_id;
};

const getUser = () => {
  return user_token;
};

const setUserToken = (new_token) => {
  console.log('new_token', new_token)
  cookie.save("customer_auth", new_token);
};

const logout = () => {
  cookie.remove("customer_auth");
  window.location.pathname = "/";
};

export default {
  getToken,
  getUser,
  getUserId,
  setUserToken,
  logout,
};
