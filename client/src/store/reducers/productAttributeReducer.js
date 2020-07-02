import {
  ATTRIBUTE_LOADING,
  ATTRIBUTES_SUCCESS,
  ATTRIBUTE_SUCCESS,
  ATTRIBUTE_FAIL,
} from "../action/productAttributeAction";

const initialState = {
  attributes: [],
  attribute: {},
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ATTRIBUTE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ATTRIBUTES_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        loading: false,
      };
    case ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attribute: action.payload,
        loading: false,
      };
    case ATTRIBUTE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
