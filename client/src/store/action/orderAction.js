import {
  GET_ORDERS,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER
} from "../../queries/orderQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

export const ordersAction = () => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  query(GET_ORDERS)
    .then(response => {
      if (response) {
        return dispatch({
          type: ORDERS_SUCCESS,
          payload: response.data.orders
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderAction = () => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  query(GET_ORDER)
    .then(response => {
      if (response) {
        return dispatch({
          type: ORDER_SUCCESS,
          payload: response.data.order
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderDeleteAction = id => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  mutation(DELETE_ORDER, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: ORDERS_SUCCESS,
          payload: response.data.deleteOrder
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Order deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderUpdateAction = object => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  mutation(UPDATE_ORDER, object)
    .then(response => {
      if (response) {
        dispatch({
          type: ORDERS_SUCCESS,
          payload: response.data.updateOrder
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Order updated successfully",
            error: false
          }
        });

        //jumpTo("/all-orders");
        return;
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
