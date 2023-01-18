import { SET_SETTING } from "../actions/settingAction";

const settingReducer = (state = { banners: [], currencyOption: {}, stripeKey: {} }, action) => {
    switch (action.type) {
        case SET_SETTING:
            state.currencyOption = action.payload
            return state;

        default:
            return { ...state };
    }

};

export default settingReducer;