import { get } from "lodash";
import {
    ORDER_LOADING,
    ORDERS_SUCCESS,
    ORDER_FAIL,
    ORDER_SUCCESS,
    LOADING_FALSE,
  } from "../actions/orderAction";
  
  const initialState = {
    orders: [],
    order: {},
    loading: false,
    success: false,
    paymentStatus:false
  };
  
  export default (state = initialState, action) => {
    switch (action?.type) {
      case ORDER_LOADING:
        return {
         ...initialState,
         loading:true
        };
      case ORDERS_SUCCESS:
        return {
          ...state,
          orders: get( action,'payload',[]),
          loading: false,
          success: true,
        };
      case ORDER_SUCCESS:
        return {
          ...state,
          order: get( action,'payload',{}),
          loading: false,
          success: true,
        };
      case ORDER_FAIL:
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
  