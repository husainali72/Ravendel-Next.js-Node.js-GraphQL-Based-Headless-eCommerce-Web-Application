import { GROUP_PRODUCTS_FAIL, GROUP_PRODUCTS_LOADING, GROUP_PRODUCTS_LOADING_FALSE, GROUP_PRODUCTS_SUCCESS, GROUP_PRODUCT_FAIL, GROUP_PRODUCT_LOADING, GROUP_PRODUCT_LOADING_FALSE, GROUP_PRODUCT_SUCCESS } from "../action/groupProductAction";
import { AVAILABLE_PRODUCTS_SUCCESS } from "../action/productAction";

const initialState = {
  groupProducts: [],
  availableProduct: [],
  groupProduct: {},
  loading: false,
  groupLoading: false,
  success: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {

    case GROUP_PRODUCTS_LOADING:
        return {
          ...state,
          loading: true
        }

    case GROUP_PRODUCT_LOADING:
      return {
        ...state,
        groupLoading: true
      }
   
    case GROUP_PRODUCTS_SUCCESS:
      return {
        ...state,
        groupProducts: action.payload,
        loading: false,
        success: true,
      };
    case GROUP_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case GROUP_PRODUCT_SUCCESS:
      return {
        ...state,
        groupProduct: action.payload,
        groupLoading: false,
        success: true,
      };
    case AVAILABLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        availableProduct:action.payload,
      };
    case GROUP_PRODUCT_FAIL:
      return {
        ...state,
        groupLoading: false,
        success: false,
      };
      return {
        ...state,
        product: {
          ...state.product,
          description: action.payload.description,
        },
      };
    case GROUP_PRODUCTS_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case GROUP_PRODUCT_LOADING_FALSE:
      return {
        ...state,
        groupLoading: false,
      };
    default:
      return state;
  }
};
