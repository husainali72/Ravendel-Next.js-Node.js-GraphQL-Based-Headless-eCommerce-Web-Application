import {
  TAX_LOADING,
  TAXS_SUCCESS,
  TAX_FAIL,
  TAX_SUCCESS,
  LOADING_FALSE,
} from "../action/taxAction";

const initialState = {
  taxs: [],
  tax: {
    global: {
      is_global: false
    },
    taxClass: []
  },
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TAX_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case TAXS_SUCCESS:
      return {
        ...state,
        taxs: action.payload,
        loading: false,
        success: true,
      };
    case TAX_SUCCESS:
      return {
        ...state,
        tax: action.payload,
        loading: false,
        success: true,
      };
    case TAX_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
