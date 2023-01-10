import {
  GET_REVIEWS,
  GET_REVIEW,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "../../queries/reviewQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

export const reviewsAction = () => (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });
  query(GET_REVIEWS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "reviews"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: REVIEWS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: REVIEW_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const reviewAction = (id) => (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });
  query(GET_REVIEW, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "review"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: REVIEW_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: REVIEW_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const reviewAddAction = (object) => (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });
  mutation(ADD_REVIEW, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addReview"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        dispatch(reviewsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: REVIEW_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const reviewUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });

  mutation(UPDATE_REVIEW, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateReview"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        jumpTo(`${client_app_route_url}reviews`);
        dispatch(reviewsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: REVIEW_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const reviewDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: REVIEW_LOADING,
  });
  mutation(DELETE_REVIEW, { id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteReview"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        dispatch(reviewsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: REVIEW_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const REVIEW_LOADING = "REVIEW_LOADING";
export const REVIEWS_SUCCESS = "REVIEWS_SUCCESS";
export const REVIEW_SUCCESS = "REVIEW_SUCCESS";
export const REVIEW_FAIL = "REVIEW_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
