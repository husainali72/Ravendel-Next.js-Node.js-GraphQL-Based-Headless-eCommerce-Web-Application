export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_DONE = "LOGIN_DONE";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";

export const loginAction = (user) => (dispatch) => {
    dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
    })
}

export const logoutAction = (user) => (dispatch) => {
    dispatch({
        type: "LOGOUT_SUCCESS",
        payload: user,
    })
}
export const customerAction = (user) => (dispatch) => {
    dispatch({
        type: CUSTOMER_SUCCESS,
        payload: user,
    })
}