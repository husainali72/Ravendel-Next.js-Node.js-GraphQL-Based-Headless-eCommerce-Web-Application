import { SET_SETTING, GET_SETTING } from "../actions/settingAction";

const settingReducer = (state = { banners: [], currencyOption: {}, stripeKey: {}, setting: {} }, action) => {
    switch (action.type) {
        case SET_SETTING:
            state.currencyOption = action.payload
            return state;
        case GET_SETTING:
            state.setting = action.payload
            return state;
        default:
            return { ...state };
    }

};

export default settingReducer;