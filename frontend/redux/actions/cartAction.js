export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const INCRESE_QUANTITY = "INCRESE_QUANTITY"
export const REMOVE_VALUE = "REMOVE_VALUE";
export const REMOVE_ALL_VALUE = "REMOVE_ALL_VALUE";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const CREATE_CART_ON_LOGIN = "CREATE_CART_ON_LOGIN";
export const UPDATE_CART_ON_LOGIN = "UPDATE_CART_ON_LOGIN";

export const addToCart = (product, quantity = 1, token, id) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: { product, quantity, token, id },
    })
}

export const removeCartItemAction = (cartProduct) => (dispatch) => {
    dispatch({
        type: REMOVE_VALUE,
        payload: cartProduct,
    });
};

export const increaseQuantity = (_id, originalQuantity, variantId) => (dispatch) => {
    dispatch({
        type: INCRESE_QUANTITY,
        payload: { _id, originalQuantity, variantId },
    })
}
export const decreaseQuantity = (object) => (dispatch) => {
    dispatch({
        type: DECREASE_QUANTITY,
        payload: object,
    })
}
export const RemoveAllCartItemsAction = ([]) => (dispatch) => {
    dispatch({
        type: REMOVE_ALL_VALUE,
        payload: [],
    })
}
export const createCart = (id, cart) => (dispatch) => {
    dispatch({ type: CREATE_CART_ON_LOGIN, payload: { id, cart, dispatch } });
}

export const updateCart = (id, cart) => (dispatch) => {
    dispatch({ type: UPDATE_CART_ON_LOGIN, payload: { id, cart } });
}