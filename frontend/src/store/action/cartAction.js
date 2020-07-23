export const removeCartItemAction = (cartProduct) => (dispatch) => {
  dispatch({
    type: REMOVE_VALUE,
    payload: cartProduct,
  });
};

export const REMOVE_VALUE = "REMOVE_VALUE";
