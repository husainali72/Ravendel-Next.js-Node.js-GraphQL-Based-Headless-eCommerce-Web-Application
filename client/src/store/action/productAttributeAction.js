import {
  GET_ATTRIBUTES,
  GET_ATTRIBUTE,
  ADD_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
} from "../../queries/productAttributeQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const attributesAction = () => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  query(GET_ATTRIBUTES)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "productAttributes"
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
          type: ATTRIBUTES_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const attributeAction = (id) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  query(GET_ATTRIBUTE, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "productAttribute"
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
          type: ATTRIBUTE_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const attributeAddAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(ADD_ATTRIBUTE, object)
    .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addAttribute"
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
        dispatch(attributesAction());
        navigate(`${client_app_route_url}attributes`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const attributeUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(UPDATE_ATTRIBUTE, object)
    .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateAttribute"
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
        dispatch(attributesAction());
        navigate(`${client_app_route_url}attributes`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const attributeDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(DELETE_ATTRIBUTE, { id: id })
    .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteAttribute"
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
        dispatch(attributesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const ATTRIBUTE_LOADING = "ATTRIBUTE_LOADING";
export const ATTRIBUTES_SUCCESS = "ATTRIBUTES_SUCCESS";
export const ATTRIBUTE_SUCCESS = "ATTRIBUTE_SUCCESS";
export const ATTRIBUTE_FAIL = "ATTRIBUTE_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
