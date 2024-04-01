import { SET_SETTING, GET_SETTING } from "../actions/settingAction";

const initialState = {
  banners: [],
  currencyOption: {},
  stripeKey: {},
  setting: {},
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      return {
        ...state,
        currencyOption: action.payload,
      };
    case GET_SETTING:
      return {
        ...state,
        setting: action.payload,
      };
    default:
      return state;
  }
};

export default settingReducer;
