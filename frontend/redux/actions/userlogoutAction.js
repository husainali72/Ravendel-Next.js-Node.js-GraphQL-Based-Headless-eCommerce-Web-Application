
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const logoutDispatch = () => (dispatch) => {
    dispatch({
        type: USER_LOGGED_OUT
    })
}
export default logoutDispatch;