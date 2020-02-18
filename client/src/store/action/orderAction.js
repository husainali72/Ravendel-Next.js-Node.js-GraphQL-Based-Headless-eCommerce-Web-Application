import React from "react";
import { GET_ORDERS, GET_ORDER, DELETE_ORDER } from "../../queries/orderQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

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
        payload: { boolean: true, message: error }
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
        payload: { boolean: true, message: error }
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
          payload: { boolean: true, message: "Order deleted successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
