import {
  CUSTOMER_LOADING,
  CUSTOMERS_SUCCESS,
  CUSTOMER_FAIL,
  CUSTOMER_SUCCESS
} from "../action/customerAction";

const initialState = {
  customers: [],
  customer: {},
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_LOADING:
      return {
        ...state,
        loading: true
      };
    case CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loading: false
      };
    case CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        loading: false
      };
    case CUSTOMER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
