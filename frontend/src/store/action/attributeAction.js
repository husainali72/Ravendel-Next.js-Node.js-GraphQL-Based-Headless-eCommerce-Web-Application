import { GET_ATTRIBUTES } from "../../queries/productQuery";

import { mutation, query } from "../../utils/service";

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
      return dispatch({
        type: ATTRIBUTE_FAIL,
      });
    });
};

export const ATTRIBUTE_LOADING = "ATTRIBUTE_LOADING";
export const ATTRIBUTES_SUCCESS = "ATTRIBUTES_SUCCESS";
export const ATTRIBUTE_SUCCESS = "ATTRIBUTE_SUCCESS";
export const ATTRIBUTE_FAIL = "ATTRIBUTE_FAIL";
