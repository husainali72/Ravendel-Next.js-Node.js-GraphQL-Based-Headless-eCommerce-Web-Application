import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/loginAction";

const initialState = {
    user_token: {},
    token_loading: false,
    error: {},
    insert_token_error: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user_token: action.payload.token,
                token_loading: true,

            }

        case LOGOUT_SUCCESS:
            return action.payload
        default:
            return state;
    }
}
export default loginReducer;