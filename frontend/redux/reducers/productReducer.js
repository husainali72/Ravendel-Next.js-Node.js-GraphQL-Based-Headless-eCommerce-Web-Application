/* eslint-disable no-unused-vars */
import {
  PRODUCT_REVIEWS_ADD,
  ADD_REVIEW,
  LOAD_REVIEW,
  PRODUCTS_FAIL,
  PRODUCTS_LOADING,
  LOADING_FALSE,
  PRODUCTS_SUCCESS,
  ATTRIBUTES_SUCCESS,
  CATEGORY_SUCCESS,
  PRODUCTS_FILTER_SUCCESS,
} from "../actions/productAction";

const initialState = {
  productReviews: [],
  attributes: [],
  loading: false,
  success: false,
  parentLoading: false,
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_REVIEW:
    case PRODUCT_REVIEWS_ADD:
      return {
        ...state,
        loading: false,
        parentLoading: false,
        success: true,
      };

    case PRODUCTS_LOADING:
      if (state?.productFilter) {
        return {
          ...state,
          success: false,
          loading: true,
        };
      } else {
        return {
          ...state,
          success: false,
          loading: false,
          parentLoading: true,
        };
      }

    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
        parentLoading: false,
      };

    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        parentLoading: false,
        success: true,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        parentLoading: false,
        success: true,
      };
    case ATTRIBUTES_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        loading: false,
        parentLoading: false,
        success: true,
      };
    case PRODUCTS_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
        parentLoading: false,
        success: false,
      };
    case LOAD_REVIEW:
      return {
        ...state,
        loading: false,
        productReviews: action.payload,
        parentLoading: false,
        success: true,
      };
    case PRODUCTS_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        productFilter: action.payload,
        parentLoading: false,
        success: true,
      };
    default:
      return state;
  }
};
export default productReducer;
