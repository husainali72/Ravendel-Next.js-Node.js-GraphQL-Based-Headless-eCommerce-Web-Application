import { login } from "../../utils/service";
import cookie from "react-cookies";
import { client_app_route_url } from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
export const LoginAction = (email, password, navigate) => (dispatch) => {
  dispatch({
    type: POST_TOKEN_BEGIN,
  });
  return login(email, password, navigate)
    .then((res) => {
      dispatch({
        type: POST_TOKEN_SUCCESS,
        payload: res,
      });

      navigate(`${client_app_route_url}dashboard`);
    })
    .catch((error) => {
      dispatch({
        type: POST_TOKEN_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      })
    });
};

export const insertToken = () => (dispatch) => {
  let token;
  if (cookie.load("auth")) {
    token = cookie.load("auth");
    dispatch({
      type: INSERT_TOKEN_SUCCESS,
      payload: token,
    });
  } else {
    dispatch({
      type: INSERT_TOKEN_FAIL,
    });
  }
};

export const logoutAction = () => (dispatch) => {
  cookie.remove("auth");
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const POST_TOKEN_BEGIN = "POST_TOKEN_BEGIN";
export const POST_TOKEN_SUCCESS = "POST_TOKEN_SUCCESS";
export const POST_TOKEN_FAIL = "POST_TOKEN_FAIL";
export const INSERT_TOKEN_SUCCESS = "INSERT_TOKEN_SUCCESS";
export const INSERT_TOKEN_FAIL = "INSERT_TOKEN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
