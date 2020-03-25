import { GET_BLOGS, GET_BLOGTAGS } from "../../queries/blogQuery";

import { query } from "../../utils/service";

export const blogsAction = () => dispatch => {
  dispatch({
    type: BLOG_LOADING
  });
  query(GET_BLOGS)
    .then(response => {
      if (response) {
        return dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.blogs
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: BLOG_FAIL,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const blogtagsAction = () => dispatch => {
  dispatch({
    type: BLOGTAG_LOADING
  });
  query(GET_BLOGTAGS)
    .then(response => {
      if (response) {
        return dispatch({
          type: BLOGTAGS_SUCCESS,
          payload: response.data.blogtags
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOGTAG_FAIL
      });
      return dispatch({
        type: BLOGTAG_FAIL,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const BLOG_LOADING = "BLOG_LOADING";
export const BLOGS_SUCCESS = "BLOGS_SUCCESS";
export const BLOG_SUCCESS = "BLOG_SUCCESS";
export const BLOG_FAIL = "BLOG_FAIL";
export const TINYMCE_SUCCESS = "TINYMCE_SUCCESS";
export const TINYMCE_NULL = "TINYMCE_NULL";

export const BLOGTAG_LOADING = "BLOGTAG_LOADING";
export const BLOGTAGS_SUCCESS = "BLOGTAGS_SUCCESS";
export const BLOGTAG_FAIL = "BLOGTAG_FAIL";
