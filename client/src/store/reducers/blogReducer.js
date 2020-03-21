import {
  BLOG_LOADING,
  BLOGS_SUCCESS,
  BLOG_FAIL,
  BLOG_SUCCESS,
  TINYMCE_SUCCESS,
  TINYMCE_NULL,
  BLOGTAG_LOADING,
  BLOGTAGS_SUCCESS,
  BLOGTAG_FAIL
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
    case TINYMCE_SUCCESS:
      return {
        ...state,
        blog: {
          ...state.blog,
          content: action.payload.content
        }
      };
    case TINYMCE_NULL:
      return {
        ...state,
        blog: {
          ...state.blog,
          content: action.payload.content
        }
      };
    case BLOGTAG_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case BLOGTAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload,
        loading: false,
        success: true
      };
    case BLOGTAG_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};
