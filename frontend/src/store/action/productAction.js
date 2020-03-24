import { GET_PRODUCTS, GET_CATEGORIES } from "../../queries/productQuery";
import { query } from "../../utils/service";
// import jumpTo from "../../utils/navigation";

export const productsAction = () => dispatch => {
  dispatch({
    type: PRODUCT_LOADING
  });
  query(GET_PRODUCTS)
    .then(response => {
      if (response) {
        return dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.products
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PRODUCT_FAIL
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const categoriesAction = () => dispatch => {
  dispatch({
    type: CAT_LOADING
  });
  query(GET_CATEGORIES)
    .then(response => {
      if (response) {
        return dispatch({
          type: CATS_SUCCESS,
          payload: response.data.productCategories
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CAT_FAIL
      });
      return dispatch({
        type: CAT_FAIL,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
