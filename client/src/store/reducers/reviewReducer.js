import {
  REVIEW_LOADING,
  REVIEWS_SUCCESS,
  REVIEW_SUCCESS,
  REVIEW_FAIL
} from "../action/reviewAction";

const initialState = {
  reviews: [],
  review: {},
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_LOADING:
      return {
        ...state,
        loading: true
      };
    case REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false
      };
    case REVIEW_SUCCESS:
      return {
        ...state,
        review: action.payload,
        loading: false
      };
    case REVIEW_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
