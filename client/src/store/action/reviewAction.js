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
import { client_app_route_url, getResponseHandler, mutationResponseHandler } from "../../utils/helper";

export const reviewsAction = () => dispatch => {
  dispatch({
    type: REVIEW_LOADING
  });
  query(GET_REVIEWS)
    .then(response => {
      // if (response && response.data && response.data.reviews) {
      //   var reviews = response.data.reviews;
      //   if(reviews.message.success){
      //     return dispatch({
      //       type: REVIEWS_SUCCESS,
      //       payload: reviews.data
      //     });
      //   }else {
      //     return dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: { boolean: true, message: reviews.message.message, error: true }
      //     });
      //   }
      // }
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
      // if (response) {
      //   return dispatch({
      //     type: REVIEW_SUCCESS,
      //     payload: response.data.review
      //   });
      // }
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
      // if (response.data.addReview.success) {
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Review added successfully",
      //       error: false
      //     }
      //   });
      // }else {
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.addReview.message, error: true }
      //   });

      // }
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
      // if (response.data.updateReview.success) {
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });
      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Review updated successfully",
      //       error: false
      //     }
      //   });

      //   return;
      // }else{ 
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateReview.message, error: true }
      //   });
      // }
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
      // if (response.data.deleteReview.success) {
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });

      //   dispatch(reviewsAction());

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Review deleted successfully",
      //       error: false
      //     }
      //   });
      // }else {
      //   dispatch({
      //     type: REVIEW_FAIL,
      //   });
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteReview.message, error: true }
      //   });
      // }
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
export const LOADING_FALSE = "LOADING_FALSE";
