import jumpTo from "../../utils/navigation";
import { baseUrl, login } from "../../utils/service";

export const LoginAction = (email, password) => {
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
    // dispatch({
    //   type: POST_TOKEN_SUCCESS,
    //   payload: res
    // });
    console.log('success login', res)

    jumpTo(`${baseUrl}dashboard`);
  })
  .catch(error => {
    // dispatch({
    //   type: POST_TOKEN_FAIL
    // });
    //throw error;
    // return dispatch({
    //   type: ALERT_SUCCESS,
    //   payload: { boolean: true, message: error.response.data, error: true }
    // });
    console.log('error', error)
  });
};

