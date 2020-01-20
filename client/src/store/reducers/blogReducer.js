import {
  BLOG_LOADING,
  BLOGS_SUCCESS,
  BLOG_FAIL,
  BLOG_SUCCESS,
  TINYMCE_SUCCESS,
  TINYMCE_NULL
} from "../action/blogAction";

const initialState = {
  blogs: [],
  blog: {},
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
    default:
      return state;
  }
};
