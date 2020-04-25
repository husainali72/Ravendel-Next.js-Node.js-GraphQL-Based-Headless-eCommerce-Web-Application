import {
  GET_BLOGS,
  GET_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOGTAGS,
  ADD_BLOGTAG,
  UPDATE_BLOGTAG,
  DELETE_BLOGTAG,
} from "../../queries/blogQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const blogclearAction = () => (dispatch) => {
  dispatch({
    type: BLOG_SUCCESS,
    payload: {},
  });

  dispatch({
    type: BLOGTAGS_SUCCESS,
    payload: [],
  });

  dispatch({
    type: TINYMCE_NULL,
    payload: {},
  });
};

export const blogsAction = () => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  query(GET_BLOGS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.blogs,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogAction = (id) => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  query(GET_BLOG, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: BLOG_SUCCESS,
          payload: response.data.blog,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogAddAction = (object) => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  mutation(ADD_BLOG, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.addBlog,
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {},
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Blog added successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
      });

      dispatch({
        type: TINYMCE_NULL,
        payload: {},
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  mutation(UPDATE_BLOG, object)
    .then((response) => {
      if (response) {
        jumpTo("/all-blogs");
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.updateBlog,
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {},
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Blog updated successfully",
            error: false,
          },
        });

        return;
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
      });

      dispatch({
        type: TINYMCE_NULL,
        payload: {},
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  mutation(DELETE_BLOG, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: BLOGS_SUCCESS,
          payload: response.data.deleteBlog,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Blog deleted successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

/*----------------------------------------------TAGS---------------------------------------------------------------------*/

export const blogtagsAction = () => (dispatch) => {
  dispatch({
    type: BLOGTAG_LOADING,
  });
  query(GET_BLOGTAGS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: BLOGTAGS_SUCCESS,
          payload: response.data.blogtags,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOGTAG_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogtagAddAction = (object) => (dispatch) => {
  dispatch({
    type: BLOGTAG_LOADING,
  });
  mutation(ADD_BLOGTAG, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: BLOGTAGS_SUCCESS,
          payload: response.data.addBlogTag,
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Tag added successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOGTAG_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogtagUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: BLOGTAG_LOADING,
  });
  mutation(UPDATE_BLOGTAG, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: BLOGTAGS_SUCCESS,
          payload: response.data.updateBlogTag,
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Tag updated successfully",
            error: false,
          },
        });

        return;
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOGTAG_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const blogtagDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BLOGTAG_LOADING,
  });
  mutation(DELETE_BLOGTAG, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: BLOGTAGS_SUCCESS,
          payload: response.data.deleteBlogTag,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Tag deleted successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BLOGTAG_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
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
