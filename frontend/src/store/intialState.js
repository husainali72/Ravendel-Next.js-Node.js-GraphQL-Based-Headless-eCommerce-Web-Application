import cookie from "react-cookies";

const IntialState = {
  login: cookie.load("user") ? true : false,
};

export default IntialState;
