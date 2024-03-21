/* eslint-disable no-unused-vars */
import { get } from "lodash";
import {
  GET_SINGLE_ORDER_DETAILS,
  UPDATE_PAYMENT_STATUS,
} from "../../queries/orderquery";
import { mutation, query } from "../../utills/helpers";
import notify from "../../utills/notifyToast";
import { SET_USER_CART } from "./cartAction";

export const getSingleOrderAction = (variable) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  query(GET_SINGLE_ORDER_DETAILS, variable)
    .then((response) => {
      const success = get(response, "data.order.message.success");
      if (success) {
        const orderDetail = get(response, "data.order.data");
        return dispatch({
          type: ORDER_SUCCESS,
          payload: orderDetail,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
    });
};
export const updatePaymentStatus = (variable) => (dispatch) => {
  mutation(UPDATE_PAYMENT_STATUS, variable)
    .then((response) => {
      const success = get(response, "data.updatePaymentStatus.success", false);
      const message = get(response, "data.updatePaymentStatus.message", true);
      if (success) {
        if (message) {
          notify(message, true);
        }
        dispatch({
          type: SET_USER_CART,
          payload: [],
        });
        dispatch({
          type: PAYMENT_UPDATED,
          payload: success,
        });
      } else if (!success && message) {
        notify(message, false);
      }
    })
    .catch((error) => {});
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const LOADING_FALSE = "LOADING_FALSE";
export const PAYMENT_UPDATED = "PAYMENT_UPDATED";
