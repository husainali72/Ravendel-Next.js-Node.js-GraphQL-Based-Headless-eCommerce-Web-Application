import {
  GET_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG
} from "../../queries/blogQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const blogsAction = () => dispatch => {
  dispatch({
    type: BLOG_LOADING
  });
  query(GET_BLOGS)
    .then(response => {
      if (response) {
        return dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.blogs,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const blogAddAction = object => dispatch => {
  dispatch({
    type: BLOG_LOADING
  });
  mutation(ADD_BLOG, object)
    .then(response => {
      if (response) {
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.addBlog
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {}
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Blog added successfully", error: false }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });

      dispatch({
        type: TINYMCE_NULL,
        payload: {}
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const blogUpdateAction = object => dispatch => {
  dispatch({
    type: BLOG_LOADING
  });
  mutation(UPDATE_BLOG, object)
    .then(response => {
      if (response) {
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.updateBlog
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {}
        });

        jumpTo("/all-blogs");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Blog updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });

      dispatch({
        type: TINYMCE_NULL,
        payload: {}
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const blogDeleteAction = id => dispatch => {
  dispatch({
    type: BLOG_LOADING
  });
  mutation(DELETE_BLOG, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.deleteBlog
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Blog deleted successfully", error: false }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
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
