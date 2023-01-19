import {
  DASHBOARD_LOADING,
  DASHBOARD_FAIL,
  DASHBOARD_SUCCESS,
} from "../action/dashboardAction";

const initialState = {
  dashboard_data: [],

  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard_data: action.payload,

        loading: false,
      };

    case DASHBOARD_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
