import {
  GET_COUPONS,
  GET_COUPON,
  ADD_COUPON,
  UPDATE_COUPON,
  DELETE_COUPON,
} from "../../queries/couponQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

export const couponsAction = () => (dispatch) => {
  dispatch({
    type: COUPON_LOADING,
  });
  query(GET_COUPONS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "coupons"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: COUPONS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COUPON_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const couponAction = (id) => (dispatch) => {
  dispatch({
    type: COUPON_LOADING,
  });
  query(GET_COUPON, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "coupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: COUPON_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COUPON_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const couponAddAction = (object) => (dispatch) => {
  dispatch({
    type: COUPON_LOADING,
  });

  mutation(ADD_COUPON, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(couponsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COUPON_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const couponUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: COUPON_LOADING,
  });
  mutation(UPDATE_COUPON, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(couponsAction());
        navigate(`${client_app_route_url}all-coupons`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COUPON_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const couponDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: COUPON_LOADING,
  });
  mutation(DELETE_COUPON, { id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(couponsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COUPON_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const COUPON_LOADING = "COUPON_LOADING";
export const COUPONS_SUCCESS = "COUPONS_SUCCESS";
export const COUPON_SUCCESS = "COUPON_SUCCESS";
export const COUPON_FAIL = "COUPON_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
