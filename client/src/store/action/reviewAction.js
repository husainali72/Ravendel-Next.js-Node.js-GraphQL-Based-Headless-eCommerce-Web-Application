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
      if (response && response.data && response.data.reviews) {
        var reviews = response.data.reviews;
        if(reviews.message.success){
          return dispatch({
            type: REVIEWS_SUCCESS,
            payload: reviews.data
          });
        }else {
          return dispatch({
            type: ALERT_SUCCESS,
            payload: { boolean: true, message: reviews.message.message, error: true }
          });
        }
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
      if (response.data.addReview.success) {
        dispatch({
          type: REVIEW_FAIL,
        });
        
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Review added successfully",
            error: false
          }
        });
      }else {
        dispatch({
          type: REVIEW_FAIL,
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.addReview.message, error: true }
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
      if (response.data.updateReview.success) {
        dispatch({
          type: REVIEW_FAIL,
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
      }else{ 
        dispatch({
          type: REVIEW_FAIL,
        });
        
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.updateReview.message, error: true }
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

export const reviewDeleteAction = id => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  mutation(DELETE_REVIEW, { id })
    .then(response => {
      if (response.data.deleteReview.success) {
        dispatch({
          type: REVIEW_FAIL,
        });

        dispatch(reviewsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Review deleted successfully",
            error: false
          }
        });
      }else {
        dispatch({
          type: REVIEW_FAIL,
        });
        
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.deleteReview.message, error: true }
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
