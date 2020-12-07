import {
  PRODUCT_LOADING,
  PRODUCTS_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  CAT_LOADING,
  CATS_SUCCESS,
  CAT_FAIL,
  CAT_SUCCESS,
  TINYMCE_DESCRIPTION,
  TINYMCE_DESCRIPTION_NULL,
} from "../action/productAction";

const initialState = {
  products: [],
  product: {},
  categories: [],
  category: {},
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        success: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        success: true,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case TINYMCE_DESCRIPTION:
      return {
        ...state,
        product: {
          ...state.product,
          description: action.payload.description,
        },
      };
    case TINYMCE_DESCRIPTION_NULL:
      return {
        ...state,
        product: {
          ...state.product,
          description: action.payload.description,
        },
      };
    case "PRODUCT_RESET":
      console.log("payload", action.payload);
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
