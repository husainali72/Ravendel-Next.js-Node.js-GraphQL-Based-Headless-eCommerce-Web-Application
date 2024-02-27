import { get } from "lodash";
import { CHANGE_QTY, DELETE_CART, DELETE_CART_PRODUCTS, GET_USER_CART } from "../../queries/cartquery";
import { mutation, query } from "../../utills/helpers";
import notify from "../../utills/notifyToast";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const INCRESE_QUANTITY = "INCRESE_QUANTITY";
export const REMOVE_VALUE = "REMOVE_VALUE";
export const REMOVE_ALL_VALUE = "REMOVE_ALL_VALUE";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const CREATE_CART_ON_LOGIN = "CREATE_CART_ON_LOGIN";
export const UPDATE_CART_ON_LOGIN = "UPDATE_CART_ON_LOGIN";
export const SET_USER_CART = "SET_USER_CART";
export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const getUserCart = (id) => (dispatch) => {
     dispatch({
        type: CART_LOADING,
      });
  query(GET_USER_CART, id,dispatch)
    .then((res) => {
      const response = get(res, "data.cartbyUser");

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
  (_id, originalQuantity, variantId) => (dispatch) => {
    dispatch({
      type: INCRESE_QUANTITY,
      payload: { _id, originalQuantity, variantId },
    });
  };
export const decreaseQuantity = (object) => (dispatch) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: object,
  });
};
export const createCart = (id, cart) => (dispatch) => {
  dispatch({ type: CREATE_CART_ON_LOGIN, payload: { id, cart, dispatch } });
};

export const updateCart = (id, cart) => (dispatch) => {
  dispatch({ type: UPDATE_CART_ON_LOGIN, payload: { id, cart } });
};
export const changeQty = (variables) => (dispatch) => {
  return mutation(CHANGE_QTY, variables,dispatch)
    .then((response) => {
      const {success,message}=get(response,'data.changeQty')
      if (!success) {
        notify(message, success)
      }
      return response
    })
    .catch((error) => {});
};
export const removeAllCartItemsAction = (variables) => (dispatch) => {
  return mutation(DELETE_CART, variables,dispatch)
    .then((response) => {
      if (response) {
        dispatch({
            type: REMOVE_ALL_VALUE,
            payload: [],
          });
  
      }
      return response
    })
    .catch((error) => {});
};
