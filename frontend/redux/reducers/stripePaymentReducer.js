import { STRIPE_PUBLIC_KEY } from "../actions/settingAction"

const stripeKeyReducer = (state = "", action) => {
    switch (action.type) {
        case STRIPE_PUBLIC_KEY:
            return action.payload;

        default:
            return { ...state };
    }


}
export default stripeKeyReducer;