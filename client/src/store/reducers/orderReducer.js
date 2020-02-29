import {
    ORDER_LOADING,
    ORDERS_SUCCESS,
    ORDER_FAIL,
    ORDER_SUCCESS
  } from "../action/orderAction";
  
  const initialState = {
    orders: [],
    order: {},
    loading: false,
    success: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case ORDER_LOADING:
        return {
          ...state,
          loading: true,
          success: false
        };
      case ORDERS_SUCCESS:
        return {
          ...state,
          orders: action.payload,
          loading: false,
          success: true
        };
      case ORDER_SUCCESS:
        return {
          ...state,
          order: action.payload,
          loading: false,
          success: true
        };
      case ORDER_FAIL:
        return {
          ...state,
          loading: false,
          success: false
        };
      default:
        return state;
    }
  };
  