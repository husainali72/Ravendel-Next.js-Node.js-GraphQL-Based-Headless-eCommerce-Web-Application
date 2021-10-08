import {
  GET_COUPONS,
  GET_COUPON,
  ADD_COUPON,
  UPDATE_COUPON,
  DELETE_COUPON
} from "../../queries/couponQuery";
import {client_app_route_url, getResponseHandler, mutationResponseHandler} from '../../utils/helper';
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const couponsAction = () => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  query(GET_COUPONS)
    .then(response => {
      // if (response.data.coupons.message.success) {
      //   return dispatch({
      //     type: COUPONS_SUCCESS,
      //     payload: response.data.coupons.data
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.coupons.message.message, error: true }
      //   });
      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: COUPONS_SUCCESS,
          payload: data,
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
      // if (response.data.coupon.message.success) {
      //   return dispatch({
      //     type: COUPON_SUCCESS,
      //     payload: response.data.coupon.data
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.coupon.message.message, error: true }
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: COUPON_SUCCESS,
          payload: data,
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
      // if (response.data.addCoupon.success) {
      //   dispatch({
      //     type: COUPON_FAIL
      //   });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Coupon added successfully",
      //       error: false
      //     }
      //   });
      // }else {
      //   dispatch({
      //     type: COUPON_FAIL
      //   });
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.addCoupon.message, error: true }
      //   });

      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(couponsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
      // if (response.data.updateCoupon.success) {
      //   dispatch({
      //     type: COUPON_FAIL
      //   });

      //   dispatch(couponsAction());

      //   jumpTo(`${client_app_route_url}all-coupons`);

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Coupon updated successfully",
      //       error: false
      //     }
      //   });

      //   return;
      // }else{
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateCoupon.message, error: true }
      //   });

      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(couponsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const couponDeleteAction = id => dispatch => {
  dispatch({
    type: COUPON_LOADING
  });
  console.log(id)
  mutation(DELETE_COUPON, { id })
    .then(response => {
      // if (response.data.deleteCoupon.success) {
      //   dispatch({
      //     type: COUPON_FAIL,
      //   });

      //   dispatch(couponsAction());

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Coupon deleted successfully",
      //       error: false
      //     }
      //   });
      // }else{
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteCoupon.message, error: true }
      //   });

      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteCoupon"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(couponsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
export const LOADING_FALSE = "LOADING_FALSE";
