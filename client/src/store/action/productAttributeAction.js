import {
  GET_ATTRIBUTES,
  GET_ATTRIBUTE,
  ADD_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
} from "../../queries/productAttributeQuery";
import {client_app_route_url, getResponseHandler, mutationResponseHandler} from '../../utils/helper';
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
      // if (response) {
      //   return dispatch({
      //     type: ATTRIBUTES_SUCCESS,
      //     payload: response.data.product_attributes,
      //   });
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "product_attributes"
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
        payload: { boolean: true, message: error, error: true },
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
      // if (response) {
      //   return dispatch({
      //     type: ATTRIBUTE_SUCCESS,
      //     payload: response.data.product_attribute,
      //   });
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "product_attribute"
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const attributeAddAction = (object) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(ADD_ATTRIBUTE, object)
    .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      // if (response.data.addAttribute.success) {
      //   jumpTo(`${client_app_route_url}attributes`);
      //   dispatch(attributesAction());
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: response.data.addAttribute.message,
      //       error: false,
      //     },
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.addAttribute.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        dispatch(attributesAction());
        jumpTo(`${client_app_route_url}attributes`);
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const attributeUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(UPDATE_ATTRIBUTE, object)
    .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      // if (response.data.updateAttribute.success) {
      //   jumpTo(`${client_app_route_url}attributes`);
      //   dispatch(attributesAction());
      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: response.data.updateAttribute.message,
      //       error: false,
      //     },
      //   });
      //   return;
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateAttribute.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        dispatch(attributesAction());
        jumpTo(`${client_app_route_url}attributes`);
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const attributeDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_LOADING,
    payload: true,
  });
  mutation(DELETE_ATTRIBUTE, { id })
  .then((response) => {
      dispatch({
        type: ATTRIBUTE_FAIL,
      });
      // if (response.data.deleteAttribute.success) {
      //   dispatch({
      //     type: "RENDER",
      //     payload: true,
      //   });

      //   dispatch(attributesAction());

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: response.data.deleteAttribute.message,
      //       error: false,
      //     },
      //   });
      // }else {
        
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteAttribute.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        dispatch(attributesAction());
        jumpTo(`${client_app_route_url}attributes`);
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const ATTRIBUTE_LOADING = "ATTRIBUTE_LOADING";
export const ATTRIBUTES_SUCCESS = "ATTRIBUTES_SUCCESS";
export const ATTRIBUTE_SUCCESS = "ATTRIBUTE_SUCCESS";
export const ATTRIBUTE_FAIL = "ATTRIBUTE_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
