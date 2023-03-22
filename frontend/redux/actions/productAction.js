import { ADD_REVIEW, GET_PRODUCTS } from "../../queries/productquery";
import { query } from "../../utills/helpers";
export const PRODUCT_REVIEWS_ADD = 'PRODUCT_REVIEWS_ADD';
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const ADD_PRODUCT_REVIEWS = "ADD_PRODUCT_REVIEWS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCTS_FAIL = "PRODUCTS_FAIL";
export const LOAD_REVIEW = "LOAD_REVIEW";


export const productreviewAction = (object) => (dispatch) => {
    dispatch({
        type: PRODUCT_REVIEWS_ADD,
    })
    mutation(ADD_REVIEW, object).then((response) => {
        if (response) {
            dispatch({
                type: ADD_PRODUCT_REVIEWS,
                payload: response.data.addReviews,
            })
        }
    }).catch((error) => {
        console.log("error", error);
        dispatch({
            type: PRODUCT_FAIL
        })
    })

}

export const loadReviewAction =(data) => (dispatch) =>{
  dispatch({
    type: LOAD_REVIEW,
    payload: data
  })
}

export const getAllProductsAction = () => (dispatch) => {
    dispatch({
      type: PRODUCTS_LOADING,
    });
    query(GET_PRODUCTS)
      .then((response) => {
          if (response) {
          return dispatch({
            type: PRODUCTS_SUCCESS,
            payload: response.data.products.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_FAIL,
        });
      });
  };
  