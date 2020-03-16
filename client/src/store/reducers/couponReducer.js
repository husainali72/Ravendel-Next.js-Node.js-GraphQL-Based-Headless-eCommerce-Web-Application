import {
  COUPON_LOADING,
  COUPONS_SUCCESS,
  COUPON_SUCCESS,
  COUPON_FAIL
} from "../action/couponAction";

const initialState = {
  coupons: [],
  coupon: {},
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUPON_LOADING:
      return {
        ...state,
        loading: true
      };
    case COUPONS_SUCCESS:
      return {
        ...state,
        coupons: action.payload,
        loading: false
      };
    case COUPON_SUCCESS:
      return {
        ...state,
        coupon: action.payload,
        loading: false
      };
    case COUPON_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
