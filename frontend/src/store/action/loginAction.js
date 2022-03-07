import jumpTo from "../../utils/navigation";
import { baseUrl, login } from "../../utils/service";
import {SHOW_ALERT} from '../reducers/alertReducer';

export const LoginAction = (email, password) => dispatch => {
  console.log('fired ogin', email, password)
  // return async (dispatch) => {
  //   if (email === "test@gmail.com" && password === "123") {
  //     dispatch({ type: "USER_LOGIN", payload: true });
  //     var userData = [
  //       {
  //         email: email,
  //         token: "A123",
  //         role: "admin",
  //       },
  //     ];
  //   } else {
  //     alert("Invalid username and password");
  //   }
  // }; 
  return login(email, password)
  .then(res => {
    dispatch({
      type: POST_TOKEN_SUCCESS,
      payload: res
    });
    console.log('success login', res)

    jumpTo(`${baseUrl}`);
  })
  .catch(error => {
    dispatch({
      type: POST_TOKEN_FAIL
    });
    return dispatch({
      type: SHOW_ALERT,
      payload: { boolean: true, message: 'Invalid credentials', error: true }
    });
  });
};


export const POST_TOKEN_BEGIN = "POST_TOKEN_BEGIN";
export const POST_TOKEN_SUCCESS = "POST_TOKEN_SUCCESS";
export const POST_TOKEN_FAIL = "POST_TOKEN_FAIL";
export const INSERT_TOKEN_SUCCESS = "INSERT_TOKEN_SUCCESS";
export const INSERT_TOKEN_FAIL = "INSERT_TOKEN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

