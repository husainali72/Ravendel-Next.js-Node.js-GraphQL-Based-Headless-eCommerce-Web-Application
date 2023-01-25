import {
  GET_PAGES,
  GET_PAGE,
  ADD_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
} from "../../queries/pageQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";
import { useNavigate } from "react-router-dom";

export const pagesAction = () => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  query(GET_PAGES)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "pages"
      );

      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: PAGES_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const pageAction = (id) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  query(GET_PAGE, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "page"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: PAGE_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const pageAddAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(ADD_PAGE, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addPage"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        //  jumpTo(`${client_app_route_url}all-pages`);
        navigate(`${client_app_route_url}all-pages`);
        dispatch(pagesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const pageUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(UPDATE_PAGE, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updatePage"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        // jumpTo(`${client_app_route_url}all-pages`);
        navigate(`${client_app_route_url}all-pages`);
        dispatch(pagesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      dispatch({
        type: TINYMCE_NULL,
        payload: {},
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const pageDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(DELETE_PAGE, { id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deletePage"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(pagesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });

      dispatch({
        type: TINYMCE_NULL,
        payload: {},
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const PAGE_LOADING = "PAGE_LOADING";
export const PAGES_SUCCESS = "PAGES_SUCCESS";
export const PAGE_SUCCESS = "PAGE_SUCCESS";
export const PAGE_FAIL = "PAGE_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";

export const TINYMCE_SUCCESS = "TINYMCE_SUCCESS";
export const TINYMCE_NULL = "TINYMCE_NULL";
