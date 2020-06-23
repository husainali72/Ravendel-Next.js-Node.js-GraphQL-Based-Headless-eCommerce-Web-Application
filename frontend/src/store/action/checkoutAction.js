export const checkoutDetailsAction = (checoutDetailsData) => (dispatch) => {
  if (localStorage.getItem("chekoutDetails")) {
    localStorage.removeItem("chekoutDetails");
  }
  dispatch({
    type: CHEKOUT_DETAILS,
    payload: checoutDetailsData,
  });
  dispatch({
    type: REMOVE_ALL_VALUE,
    payload: [],
  });
};

export const CHEKOUT_DETAILS = "CHEKOUT_DETAILS";
export const REMOVE_ALL_VALUE = "REMOVE_ALL_VALUE";
