import {
  BLOG_LOADING,
  BLOGS_SUCCESS,
  BLOG_FAIL,
  BLOG_SUCCESS,
  BLOGTAG_LOADING,
  BLOGTAGS_SUCCESS,
  BLOGTAG_FAIL,
  TAG_BLOGS
} from "../action/blogAction";

const initialState = {
  blogs: [],
  tags: [],
  loading: false,
  success: false,
  blog: [],
  tagBlogs: []
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
    case TAG_BLOGS:
      return {
        ...state,
        tagBlogs: action.payload,
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
