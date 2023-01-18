import { CUSTOMER_SUCCESS } from "../actions/loginAction";
const initialState = {
    login: false,
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_SUCCESS:
            state = undefined;

            return { login: action.payload };
        default:
            return state;
    }
};
export default customerReducer;