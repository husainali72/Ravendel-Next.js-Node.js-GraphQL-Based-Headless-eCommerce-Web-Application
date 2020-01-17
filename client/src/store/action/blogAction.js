import React from "react";
import {
  GET_BLOGS,
  GET_BLOG,
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
          payload: response.data.blogs
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
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

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Blog added successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
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
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: "Blog updated successfully" }
        });

        jumpTo("/all-blogs");
        return;
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
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
          payload: { boolean: true, message: "Blog deleted successfully" }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: BLOG_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error }
      });
    });
};

export const BLOG_LOADING = "BLOG_LOADING";
export const BLOGS_SUCCESS = "BLOGS_SUCCESS";
export const BLOG_SUCCESS = "BLOG_SUCCESS";
export const BLOG_FAIL = "BLOG_FAIL";
