import { GET_DATES, UPDATE_GENERAL } from "../../queries/settingQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const getDatesAction = () => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  query(GET_DATES).then((response) => {
    if (response) {
      return dispatch({
        type: LIST_DATE_FORMAT,
        payload: response.data.getDateformat,
      });
    }
  });
};

export const generalUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_GENERAL, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateGeneral,
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Updated successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SETTING_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const SETING_LOADING = "SETING_LOADING";
export const SETTING_SUCCESS = "SETTING_SUCCESS";
export const SETTING_FAIL = "SETTING_FAIL";
export const LIST_DATE_FORMAT = "LIST_DATE_FORMAT";
