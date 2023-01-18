import { CHECKOUT_DETAIL } from "../actions/checkoutAction";
const initialState = {
    checkoutDetails: {},
};

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_DETAIL:
            if (localStorage.getItem("chekoutDetails") === null) {
                localStorage.setItem("chekoutDetails", JSON.stringify(action.payload));
            }
            return {
                checkoutDetails: action.payload,
            }

        default: {
            return state;
        }
    }
}
export default checkoutReducer;