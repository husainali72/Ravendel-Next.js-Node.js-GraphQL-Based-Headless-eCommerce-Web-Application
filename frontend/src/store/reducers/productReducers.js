import {
  PRODUCT_LOADING,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCTS_SUCCESS,
  CATS_SUCCESS,
  CAT_LOADING,
  CAT_FAIL,
  CAT_SUCCESS,
  CAT_PRODUCTS,
  PRODUCT_REVIEWS,
  ADD_PRODUCT_REVIEWS,
  SALE_PRODUCTS_SUCCESS,
  RECENT_PRODUCTS_SUCCESS,
  FEATURED_PRODUCTS_SUCCESS,
  PRODUCTS_CATID_SUCCESS,
  LOADING_FALSE,
} from "../action/productAction";

const initialState = {
  products: [],
  product: {},
  categories: [],
  category: {},
  loading: false,
  success: false,
  singleCategoryDetails: [],
  productReviews: [],
  productsByCatId: [],
  onSaleProducts: [],
  recentProducts: [],
  featuredProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SALE_PRODUCTS_SUCCESS:
      return {
        ...state,
        onSaleProducts: action.payload,
        loading: false,
        success: true,
      };
    case RECENT_PRODUCTS_SUCCESS:
      return {
        ...state,
        recentProducts: action.payload,
        loading: false,
        success: true,
      };
    case FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        featuredProducts: action.payload,
        loading: false,
        success: true,
      };
    case PRODUCTS_CATID_SUCCESS:
      return {
        ...state,
        productsByCatId: action.payload,
        loading: false,
        success: true,
      };
    case CAT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case CATS_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        success: true,
      };
    case CAT_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
        success: true,
      };
    case CAT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        success: true,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        success: true,
      };
    case CAT_PRODUCTS:
      return {
        ...state,
        singleCategoryDetails: action.payload,
        loading: false,
        success: true,
      };
    case PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: action.payload,
        loading: false,
        success: true,
      };
    case ADD_PRODUCT_REVIEWS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
