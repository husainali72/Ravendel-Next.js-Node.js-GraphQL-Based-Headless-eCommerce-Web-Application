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
      if (response.data.brands.message.success) {
        return dispatch({
          type: BRANDS_SUCCESS,
          payload: response.data.brands.data,
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.brands.message.message, error: true },
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
      if (response.data.addBrand.success) {
        dispatch({
          type: BRAND_FAIL,
        });

        jumpTo(`${client_app_route_url}all-brands`);
        dispatch(brandsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "added successfully",
            error: false,
          },
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.addBrand.message, error: true },
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
      if (response.data.updateBrand.success) {
          dispatch({
            type: BRAND_FAIL,
          });

        jumpTo(`${client_app_route_url}all-brands`);

        dispatch(brandsAction());

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Brand updated successfully",
            error: false,
          },
        });

        return;
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.updateBrand.message, error: true },
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

export const brandDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: BRAND_LOADING,
  });
  mutation(DELETE_BRAND, { id })
    .then((response) => {
      if (response.data.deleteBrand.success) {
        dispatch({
          type: BRAND_FAIL,
        });

        dispatch(brandsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Brand deleted successfully",
            error: false,
          },
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.deleteBrand.message, error: true },
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
