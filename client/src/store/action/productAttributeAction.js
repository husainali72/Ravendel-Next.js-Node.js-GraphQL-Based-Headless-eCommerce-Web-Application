import {
  GET_ATTRIBUTES,
  GET_ATTRIBUTE,
  ADD_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
} from "../../queries/productAttributeQuery";

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
      if (response) {
        return dispatch({
          type: ATTRIBUTES_SUCCESS,
          payload: response.data.product_attributes,
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
      if (response) {
        return dispatch({
          type: ATTRIBUTE_SUCCESS,
          payload: response.data.product_attribute,
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
      if (response) {
        jumpTo("/attributes");
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: response.data.addAttribute.message,
            error: false,
          },
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
      if (response) {
        jumpTo("/attributes");
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: response.data.updateAttribute.message,
            error: false,
          },
        });
        return;
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
      if (response) {
        //jumpTo("/attributes");

        dispatch({
          type: "RENDER",
          payload: true,
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: response.data.deleteAttribute.message,
            error: false,
          },
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
