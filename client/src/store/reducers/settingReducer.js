import {
  SETING_LOADING,
  SETTING_SUCCESS,
  SETTING_FAIL,
  LIST_DATE_FORMAT,
} from "../action/settingAction";

const initialState = {
  settings: {},
  date_formats: [],
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIST_DATE_FORMAT:
      return {
        ...state,
        date_formats: action.payload,
        loading: false,
      };
    case SETTING_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };
    case SETTING_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
