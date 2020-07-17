import { GET_BRANDS, GET_BRAND } from "../../queries/brandQuery";

//import { ALERT_SUCCESS } from "../reducers/alertReducer";
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
    });
};

export const BRAND_LOADING = "BRAND_LOADING";
export const BRANDS_SUCCESS = "BRANDS_SUCCESS";
export const BRAND_SUCCESS = "BRAND_SUCCESS";
export const BRAND_FAIL = "BRAND_FAIL";
