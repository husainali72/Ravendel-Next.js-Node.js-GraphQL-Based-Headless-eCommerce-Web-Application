import { GET_DASHBOARDDATA } from "../../queries/userQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { query } from "../../utils/service";
export const dashboardAction = () => (dispatch) => {
  dispatch({
    type: DASHBOARD_LOADING,
  });
  query(GET_DASHBOARDDATA)
    .then((response) => {
      if (response.data.dashboardData) {
        return dispatch({
          type: DASHBOARD_SUCCESS,
          payload: response.data.dashboardData,
        });
      } else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: response.data.dashboardData,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};
export const DASHBOARD_LOADING = "DASHBOARD_LOADING";
export const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
export const DASHBOARD_FAIL = "DASHBOARD_FAIL";
