import {
  GET_BRANDS,
  GET_BRAND,
  ADD_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "../../queries/brandQuery";
import {client_app_route_url} from '../../utils/helper';

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const brandsAction = () => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  query(GET_BRANDS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: BRANDS_SUCCESS,
          payload: response.data.brands,
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

export const brandAddAction = (object) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(ADD_BRAND, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: BRANDS_SUCCESS,
          payload: response.data.addBrand,
        });

        jumpTo(`${client_app_route_url}all-brands`);

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "added successfully",
            error: false,
          },
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

export const brandUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(UPDATE_BRAND, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: BRANDS_SUCCESS,
          payload: response.data.updateBrand,
        });

        jumpTo(`${client_app_route_url}all-brands`);

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Brand updated successfully",
            error: false,
          },
        });

        return;
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

export const brandDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(DELETE_BRAND, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: BRANDS_SUCCESS,
          payload: response.data.deleteBrand,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Brand deleted successfully",
            error: false,
          },
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
