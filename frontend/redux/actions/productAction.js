/* eslint-disable no-unused-vars */
import { get } from "lodash";
import { GET_CATEGORIES_QUERY } from "../../queries/home";
import { ADD_REVIEW, GET_ATTRIBUTES, GET_FILTERED_PRODUCTS, GET_PRODUCTS } from "../../queries/productquery";
import { mutation, query, queryWithoutToken } from "../../utills/helpers";
export const PRODUCT_REVIEWS_ADD = 'PRODUCT_REVIEWS_ADD';
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const ADD_PRODUCT_REVIEWS = "ADD_PRODUCT_REVIEWS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const ATTRIBUTES_SUCCESS = "ATTRIBUTES_SUCCESS";
export const PRODUCTS_FAIL = "PRODUCTS_FAIL";
export const LOAD_REVIEW = "LOAD_REVIEW";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const PRODUCTS_FILTER_SUCCESS = "PRODUCTS_FILTER_SUCCESS";


export const productreviewAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_REVIEWS_ADD,
  })
  mutation(ADD_REVIEW, object).then((response) => {
    if (response) {
      dispatch({
        type: ADD_PRODUCT_REVIEWS,
        payload: get(response,'data.addReviews'),
      })
    }
  }).catch((error) => {
    dispatch({
      type: PRODUCT_FAIL
    })
  })

}

export const loadReviewAction = (data) => (dispatch) => {
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
          payload: get(response,'data.products.data'),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};
export const getFilteredProductsAction = (variable) => (dispatch) => {
  dispatch({
    type: PRODUCTS_LOADING,
  });
  queryWithoutToken(GET_FILTERED_PRODUCTS,variable)
    .then((response) => {
      let filteredProducts=get(response,'data.getCategoryPageData')
      let success=get(filteredProducts,'success')
      if (success) {
        return dispatch({
          type: PRODUCTS_FILTER_SUCCESS,
          payload: filteredProducts,
        });
      }else{
        dispatch({
          type: LOADING_FALSE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};
export const getAllCategoryAction = () => (dispatch) => {
  dispatch({
    type: PRODUCTS_LOADING,
  });
  queryWithoutToken(GET_CATEGORIES_QUERY)
    .then((response) => {
      if (response) {
        const categories=get(response,'productCategories.data',[]);
        return dispatch({
          type: CATEGORY_SUCCESS,
          payload: categories,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};
export const getAllAttributes = () => (dispatch) => {
  dispatch({
    type: PRODUCTS_LOADING,
  });
  query(GET_ATTRIBUTES)
    .then((response) => {
      if (response) {
        return dispatch({
          type: ATTRIBUTES_SUCCESS,
          payload: get(response,'data.productAttributes.data'),
        });
      }
    })
    .catch((error) => {

      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};
