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
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

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
      // if (response) {
      //   return dispatch({
      //     type: BLOGS_SUCCESS,
      //     payload: response.data.blogs.data,
      //   });
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "blogs"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        return dispatch({
          type: BLOGS_SUCCESS,
          payload: data,
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
      // if (response.data.blog.message.success) {
      //   return dispatch({
      //     type: BLOG_SUCCESS,
      //     payload: response.data.blog.data,
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.blog.message.message, error: true },
      //   });
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "blog"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        return dispatch({
          type: BLOG_SUCCESS,
          payload: data,
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
      // if (response.data.addBlog.success) {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   dispatch({
      //     type: TINYMCE_NULL,
      //     payload: {},
      //   });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Blog added successfully",
      //       error: false,
      //     },
      //   });
      // }else {
      //   dispatch({
      //     type: BLOG_FAIL,
      //   });
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     // payload: { boolean: true, message: response.data.addBlog.error, error: true },
      //     payload: { boolean: true, message: response.data.addBlog.message || 'Something went wrong', error: true },
      //   });
        
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addBlog"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        jumpTo(`${client_app_route_url}all-blogs`);
        dispatch(blogsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
      // if (response.data.updateBlog.success) {
      //   jumpTo(`${client_app_route_url}all-blogs`);
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   dispatch({
      //     type: TINYMCE_NULL,
      //     payload: {},
      //   });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Blog updated successfully",
      //       error: false,
      //     },
      //   });

      //   return;
      // }else {
      //   dispatch({
      //     type: BLOG_FAIL,
      //   });
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateBlog.message, error: true },
      //   });
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateBlog"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        jumpTo(`${client_app_route_url}all-blogs`);
        dispatch(blogsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const blogDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BLOG_LOADING,
  });
  mutation(DELETE_BLOG, { id })
    .then((response) => {
      // if (response.data.deleteBlog.success) {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });
      //   dispatch(blogsAction());
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Blog deleted successfully",
      //       error: false,
      //     },
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteBlog.message, error: true },
      //   });
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteBlog"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        dispatch(blogsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
    const [error, success, message, data] = getResponseHandler(response, 'blogtags');
    dispatch({
      type: LOADING_FALSE,
    });

    if(error){
      dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: message, error: true },
      });

      return dispatch({
        type: BLOGTAG_FAIL,
      });
    }
    
    if (success) {
     return dispatch({
       type: BLOGTAGS_SUCCESS,
       payload: data,
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
      // if (response.data.addBlogTag.success) {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   dispatch(blogtagsAction())

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Tag added successfully",
      //       error: false,
      //     },
      //   });
      // }else {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.addBlogTag.message, error: true },
      //   });

      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addBlogTag"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        dispatch(blogtagsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
      // if (response.data.updateBlogTag.success) {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Tag updated successfully",
      //       error: false,
      //     },
      //   });

      //   dispatch(blogtagsAction());

      //   return;
      // }else {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateBlogTag.message, error: true },
      //   });

      // }
      const [error, success, message] = mutationResponseHandler(
        response,
        "updateBlogTag"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        dispatch(blogtagsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const blogtagDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BLOGTAG_LOADING,
  });
  mutation(DELETE_BLOGTAG, { id })
    .then((response) => {
      // if (response.data.deleteBlogTag.success) {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });

      //   dispatch(blogtagsAction());
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Tag deleted successfully",
      //       error: false,
      //     },
      //   });
      // } else {
      //   dispatch({
      //     type: BLOGS_UPDATE_SUCCESS,
      //     payload: {},
      //   });
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteBlogTag.message, error: true },
      //   });

      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteBlogTag"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });

        return dispatch({
          type: BLOGTAG_FAIL,
        });
      }

      if (success) {
        dispatch(blogtagsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
export const BLOGS_UPDATE_SUCCESS = "BLOGS_UPDATE_SUCCESS";

export const BLOGTAG_LOADING = "BLOGTAG_LOADING";
export const BLOGTAGS_SUCCESS = "BLOGTAGS_SUCCESS";
export const BLOGTAG_FAIL = "BLOGTAG_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
