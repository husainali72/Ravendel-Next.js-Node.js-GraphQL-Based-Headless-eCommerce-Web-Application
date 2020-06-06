import { GET_HOMEPAGE_DATA } from "../../queries/homepageQuery";
import { mutation, query } from "../../utils/service";

export const homepageAction = () => (dispatch) => {
  dispatch({
    type: HOMEPAGE_LOADING,
  });
  query(GET_HOMEPAGE_DATA)
    .then((response) => {
      if (response) {
        return dispatch({
          type: HOMEPAGE_SUCCESS,
          payload: response.data.getSettings,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({
        type: HOMEPAGE_FAIL,
      });
    });
};

export const HOMEPAGE_LOADING = "HOMEPAGE_LOADING";
export const HOMEPAGE_SUCCESS = "HOMEPAGE_SUCCESS";
export const HOMEPAGE_FAIL = "HOMEPAGE_FAIL";
