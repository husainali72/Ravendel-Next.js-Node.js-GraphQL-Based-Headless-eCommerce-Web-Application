import {
  GET_REVIEWS,
  GET_REVIEW,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW
} from "../../queries/reviewQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const reviewsAction = () => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  query(GET_REVIEWS)
    .then(response => {
      if (response) {
        return dispatch({
          type: REVIEWS_SUCCESS,
          payload: response.data.reviews
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REVIEW_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const reviewAction = id => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  query(GET_REVIEW, { id: id })
    .then(response => {
      if (response) {
        return dispatch({
          type: REVIEW_SUCCESS,
          payload: response.data.review
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REVIEW_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const reviewAddAction = object => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  mutation(ADD_REVIEW, object)
    .then(response => {
      if (response) {
        dispatch({
          type: REVIEWS_SUCCESS,
          payload: response.data.addReview
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Review added successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REVIEW_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const reviewUpdateAction = object => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  mutation(UPDATE_REVIEW, object)
    .then(response => {
      if (response) {
        dispatch({
          type: REVIEWS_SUCCESS,
          payload: response.data.updateReview
        });
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Review updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: REVIEW_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const reviewDeleteAction = id => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  mutation(DELETE_REVIEW, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: REVIEWS_SUCCESS,
          payload: response.data.deleteReview
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Review deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REVIEW_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const REVIEW_LOADING = "REVIEW_LOADING";
export const REVIEWS_SUCCESS = "REVIEWS_SUCCESS";
export const REVIEW_SUCCESS = "REVIEW_SUCCESS";
export const REVIEW_FAIL = "REVIEW_FAIL";
