import {
  GET_PAGES,
  GET_PAGE,
  ADD_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
} from "../../queries/pageQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const pagesAction = () => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  query(GET_PAGES)
    .then((response) => {
      if (response) {
        return dispatch({
          type: PAGES_SUCCESS,
          payload: response.data.pages,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const pageAction = (id) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  query(GET_PAGE, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PAGE_SUCCESS,
          payload: response.data.page,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const pageAddAction = (object) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(ADD_PAGE, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: PAGES_SUCCESS,
          payload: response.data.addPage,
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {},
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Page added successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PAGE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const pageUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(UPDATE_PAGE, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: PAGES_SUCCESS,
          payload: response.data.updatePage,
        });

        dispatch({
          type: TINYMCE_NULL,
          payload: {},
        });

        jumpTo("/all-pages");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Page updated successfully",
            error: false,
          },
        });

        return;
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const pageDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
  });
  mutation(DELETE_PAGE, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: PAGES_SUCCESS,
          payload: response.data.deletePage,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Page deleted successfully",
            error: false,
          },
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const PAGE_LOADING = "PAGE_LOADING";
export const PAGES_SUCCESS = "PAGES_SUCCESS";
export const PAGE_SUCCESS = "PAGE_SUCCESS";
export const PAGE_FAIL = "PAGE_FAIL";

export const TINYMCE_SUCCESS = "TINYMCE_SUCCESS";
export const TINYMCE_NULL = "TINYMCE_NULL";
