import {
  SHIPPING_LOADING,
  SHIPPINGS_SUCCESS,
  SHIPPING_FAIL,
  SHIPPING_SUCCESS
} from "../action/shippingAction";

const initialState = {
  shippings: [],
  shipping: {
    global: {
      is_global: false
    },
    shipping_class: []
  },
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHIPPING_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case SHIPPINGS_SUCCESS:
      return {
        ...state,
        shippings: action.payload,
        loading: false,
        success: true
      };
    case SHIPPING_SUCCESS:
      return {
        ...state,
        shipping: action.payload,
        loading: false,
        success: true
      };
    case SHIPPING_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};
