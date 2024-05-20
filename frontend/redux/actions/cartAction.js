/* eslint-disable no-unused-vars */
import { get } from "lodash";
import {
  CHANGE_QTY,
  DELETE_CART,
  GET_USER_CART,
  CALCULATE_CART_WITHOUT_LOGIN,
} from "../../queries/cartquery";
import { handleError, mutation, query } from "../../utills/helpers";
import notify from "../../utills/notifyToast";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const INCRESE_QUANTITY = "INCRESE_QUANTITY";
export const REMOVE_VALUE = "REMOVE_VALUE";
export const REMOVE_ALL_VALUE = "REMOVE_ALL_VALUE";
export const CREATE_CART_ON_LOGIN = "CREATE_CART_ON_LOGIN";
export const SET_USER_CART = "SET_USER_CART";
export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
// Action for authenticated user
export const calculateUserCart = (id) => (dispatch) => {
  dispatch({
    type: CART_LOADING,
  });
  const variable = {
    id: id,
  };

  query(GET_USER_CART, variable)
    .then((res) => {
      const response = get(res, "data.calculateCart");

      return dispatch({
        type: SET_USER_CART,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: CART_FAILURE,
      });
    });
};

// Action for unauthenticated user
export const calculateUnauthenticatedCart = (products) => (dispatch) => {
  dispatch({
    type: CART_LOADING,
  });
  const cartItems = products?.map((product) => ({
    productId: get(product, "_id"),
    variantId: get(product, "variantId"),
    productTitle: get(product, "name"),
    attributes: get(product, "attributes"),
    qty: get(product, "quantity"),
  }));
  const variable = {
    cartItems: cartItems,
  };

  query(CALCULATE_CART_WITHOUT_LOGIN, variable)
    .then((res) => {
      const response = get(res, "data.calculateCart");
      return dispatch({
        type: SET_USER_CART,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: CART_FAILURE,
      });
    });
};

export const addToCart =
  (product, quantity = 1, token, id) =>
  (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { product, quantity, token, id },
    });
  };

export const removeCartItemAction = (cartProduct) => (dispatch) => {
  dispatch({
    type: REMOVE_VALUE,
    payload: cartProduct,
  });
};

export const increaseQuantity =
  (_id, originalQuantity, variantId,updatedQuantity) => (dispatch) => {
    dispatch({
      type: INCRESE_QUANTITY,
      payload: { _id, originalQuantity, variantId ,updatedQuantity},
    });
  };

export const createCart = (id, cart) => (dispatch) => {
  dispatch({ type: CREATE_CART_ON_LOGIN, payload: { id, cart, dispatch } });
};

export const changeQty = (variables,router) => (dispatch) => {
  return mutation(CHANGE_QTY, variables)
    .then((response) => {
      const { success, message } = get(response, "data.changeQty");
      if (!success) {
        notify(message);
      }
      return response;
    })
    .catch(async (error) => {
      handleError(error,dispatch,router)
    });
};
export const removeAllCartItemsAction = (variables,router) => (dispatch) => {
  return mutation(DELETE_CART, variables)
    .then((response) => {
      if (response) {
        dispatch({
          type: REMOVE_ALL_VALUE,
          payload: [],
        });
      }
      return response;
    })
    .catch((error) => {
      handleError(error,dispatch,router)
    });
};
