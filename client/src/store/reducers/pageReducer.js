import {
  PAGE_LOADING,
  PAGES_SUCCESS,
  PAGE_SUCCESS,
  PAGE_FAIL,
  TINYMCE_SUCCESS,
  TINYMCE_NULL,
} from "../action/pageAction";

const initialState = {
  pages: [],
  page: {},
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGE_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PAGES_SUCCESS:
      return {
        ...state,
        pages: action.payload,
        loading: false,
        success: true,
      };
    case PAGE_SUCCESS:
      return {
        ...state,
        page: action.payload,
        loading: false,
        success: true,
      };
    case PAGE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case TINYMCE_SUCCESS:
      return {
        ...state,
        page: {
          ...state.page,
          content: action.payload.content,
        },
      };
    case TINYMCE_NULL:
      return {
        ...state,
        page: {
          ...state.page,
          content: action.payload.content,
        },
      };
    default:
      return state;
  }
};
