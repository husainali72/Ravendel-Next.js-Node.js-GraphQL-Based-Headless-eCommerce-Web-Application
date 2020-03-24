import {
  BLOG_LOADING,
  BLOGS_SUCCESS,
  BLOG_FAIL,
  BLOG_SUCCESS
} from "../action/blogAction";

const initialState = {
  blogs: [],
  blog: {},
  tags: [],
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
        success: true
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload,
        loading: false,
        success: true
      };
    case BLOG_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};
