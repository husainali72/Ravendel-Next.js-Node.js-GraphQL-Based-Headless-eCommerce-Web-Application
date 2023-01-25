import {
  GET_BRANDS,
  GET_BRAND,
  ADD_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "../../queries/brandQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

export const brandsAction = () => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  query(GET_BRANDS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "brands"
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
          type: BRANDS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BRAND_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const brandAddAction = (object) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });

  mutation(ADD_BRAND, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addBrand"
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
        dispatch(brandsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BRAND_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const brandUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(UPDATE_BRAND, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateBrand"
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
        dispatch(brandsAction());
        navigate(`${client_app_route_url}all-brands`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BRAND_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const brandDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(DELETE_BRAND, { id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteBrand"
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
        dispatch(brandsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: BRAND_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const BRAND_LOADING = "BRAND_LOADING";
export const BRANDS_SUCCESS = "BRANDS_SUCCESS";
export const BRAND_SUCCESS = "BRAND_SUCCESS";
export const BRAND_FAIL = "BRAND_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
