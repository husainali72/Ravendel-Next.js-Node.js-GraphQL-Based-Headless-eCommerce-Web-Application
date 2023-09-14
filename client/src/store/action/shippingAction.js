import {
  GET_SHIPPING,
  UPDATE_GLOBALSHIPPING,
  ADD_SHIPPINGCLASS,
  UPDATE_SHIPPINGCLASS,
  DELETE_SHIPPINGCLASS,
} from "../../queries/shippingQuery";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import {
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

export const shippingAction = () => (dispatch) => {
  dispatch({
    type: SHIPPING_LOADING,
  });
  query(GET_SHIPPING)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "shipping"
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
          type: SHIPPING_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SHIPPING_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const globalShippingUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SHIPPING_LOADING,
  });
  mutation(UPDATE_GLOBALSHIPPING, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateGlobalShipping"
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
        dispatch(shippingAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SHIPPING_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const shippingClassAddAction = (object) => (dispatch) => {
  dispatch({
    type: SHIPPING_LOADING,
  });
  mutation(ADD_SHIPPINGCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addShippingClass"
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
        dispatch(shippingAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SHIPPING_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const shippingClassUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SHIPPING_LOADING,
  });
  if (object && object.shippingClass && object.shippingClass.amount) {
    object.shippingClass.amount = object.shippingClass.amount.toString();
  }
  mutation(UPDATE_SHIPPINGCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateShippingClass"
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
        dispatch(shippingAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SHIPPING_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const shippingClassDeleteAction = (object) => (dispatch) => {
  dispatch({
    type: SHIPPING_LOADING,
  });
  mutation(DELETE_SHIPPINGCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteShippingClass"
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
        dispatch(shippingAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SHIPPING_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const SHIPPING_LOADING = "SHIPPING_LOADING";
export const SHIPPINGS_SUCCESS = "SHIPPINGS_SUCCESS";
export const SHIPPING_SUCCESS = "SHIPPING_SUCCESS";
export const SHIPPING_FAIL = "SHIPPING_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
