import React from "react";
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../../queries/productQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

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
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const categoryAddAction = object => dispatch => {
  dispatch({
    type: CAT_LOADING
  });
  mutation(ADD_CATEGORY, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.addProductCategory
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Category added successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CAT_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const categoryUpdateAction = object => dispatch => {
  dispatch({
    type: CAT_LOADING
  });
  mutation(UPDATE_CATEGORY, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.updateProductCategory
        });

        jumpTo("/all-blogs");

        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Category updated successfully" }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: CAT_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const categoryDeleteAction = id => dispatch => {
  dispatch({
    type: CAT_LOADING
  });
  mutation(DELETE_CATEGORY, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.deleteProductCategory
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Category deleted successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CAT_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

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
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const productAddAction = object => dispatch => {
  dispatch({
    type: PRODUCT_LOADING
  });
  mutation(ADD_PRODUCT, object)
    .then(response => {
      if (response) {
        dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.addProduct
        });

        dispatch({
          type: TINYMCE_DESCRIPTION_NULL,
          payload: {}
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Product added successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PRODUCT_FAIL
      });

      dispatch({
        type: TINYMCE_DESCRIPTION_NULL,
        payload: {}
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const TINYMCE_DESCRIPTION = "TINYMCE_DESCRIPTION";
export const TINYMCE_DESCRIPTION_NULL = "TINYMCE_DESCRIPTION_NULL";

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
