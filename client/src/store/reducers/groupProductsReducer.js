import { GROUP_PRODUCTS_FAIL, GROUP_PRODUCTS_LOADING, GROUP_PRODUCTS_LOADING_FALSE, GROUP_PRODUCTS_SUCCESS } from "../action/groupProductAction";

const initialState = {
  groupProducts: [],
  groupProduct: {},
  loading: false,
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
    default:
      return state;
  }
};
