import {
  GET_COUPONS,
  GET_COUPON,
  ADD_COUPON,
  UPDATE_COUPON,
  DELETE_COUPON
} from "../../queries/couponQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const couponsAction = () => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  query(GET_COUPONS)
    .then(response => {
      if (response) {
        return dispatch({
          type: COUPONS_SUCCESS,
          payload: response.data.coupons
        });
      }
    })
    .catch(error => {
      dispatch({
        type: COUPON_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const couponAction = id => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  query(GET_COUPON, { id: id })
    .then(response => {
      if (response) {
        return dispatch({
          type: COUPON_SUCCESS,
          payload: response.data.coupon
        });
      }
    })
    .catch(error => {
      dispatch({
        type: COUPON_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const couponAddAction = object => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  mutation(ADD_COUPON, object)
    .then(response => {
      if (response) {
        dispatch({
          type: COUPONS_SUCCESS,
          payload: response.data.addCoupon
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Coupon added successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: COUPON_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const couponUpdateAction = object => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  mutation(UPDATE_COUPON, object)
    .then(response => {
      if (response) {
        dispatch({
          type: COUPONS_SUCCESS,
          payload: response.data.updateCoupon
        });
        jumpTo("/all-coupons");
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Coupon updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: COUPON_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const couponDeleteAction = id => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  mutation(DELETE_COUPON, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: COUPONS_SUCCESS,
          payload: response.data.deleteCoupon
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Coupon deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: COUPON_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const COUPON_LOADING = "COUPON_LOADING";
export const COUPONS_SUCCESS = "COUPONS_SUCCESS";
export const COUPON_SUCCESS = "COUPON_SUCCESS";
export const COUPON_FAIL = "COUPON_FAIL";
