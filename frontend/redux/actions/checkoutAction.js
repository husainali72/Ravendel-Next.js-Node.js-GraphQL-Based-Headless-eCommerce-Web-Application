/* eslint-disable no-unused-vars */
import { mutation } from "../../utills/helpers";
import { ADD_ORDER } from "../../queries/orderquery";
export const CHECKOUT_DETAIL = "CHECKOUT_DETAIL";
export const REMOVE_ALL_VALUE = "REMOVE_ALL_VALUE";
export const CHECKOUT_LOADING = "CHECKOUT_LOADING";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_FAILED = "CHECKOUT_FAILED";
import { useSession } from "next-auth/react";
export const checkoutDetailAction = (billingDetails) => (dispatch) => {
    dispatch({
        type: CHECKOUT_DETAIL,
        payload: billingDetails,
    });
}