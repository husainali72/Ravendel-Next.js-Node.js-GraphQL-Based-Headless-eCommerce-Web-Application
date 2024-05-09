/* eslint-disable no-empty */
export const STORE_CATEGORIES = "STORE_CATEGORIES";
export const storeCategories = (categories) => (dispatch) => {
  try {
    if (categories) {
      return dispatch({
        type: STORE_CATEGORIES,
        payload: categories,
      });
    }
  } catch (e) {}
};
