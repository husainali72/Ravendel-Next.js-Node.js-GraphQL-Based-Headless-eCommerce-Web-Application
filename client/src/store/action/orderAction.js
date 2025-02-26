import {
  GET_ORDERS,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from "../../queries/orderQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

import { useNavigate } from "react-router-dom";
import { dashboardAction } from "./dashboardAction";

export const ordersAction = () => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });
  query(GET_ORDERS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "orders"
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
          type: ORDERS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const orderAction = (id) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  query(GET_ORDER, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "order"
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
          type: ORDER_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const orderDeleteAction = (id, navigate) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });
  mutation(DELETE_ORDER, { id: id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteOrder"
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
        dispatch(ordersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const orderUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  mutation(UPDATE_ORDER, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateOrder"
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
        navigate(`${client_app_route_url}all-orders`);
        dispatch(ordersAction());
        dispatch(dashboardAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const LOADING_FALSE = "LOADING_FALSE";
