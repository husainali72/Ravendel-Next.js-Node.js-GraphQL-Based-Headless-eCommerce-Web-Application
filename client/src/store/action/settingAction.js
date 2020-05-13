import {
  GET_DATES,
  UPDATE_GENERAL,
  GET_SETTINGS,
  UPDATE_MEDIA,
  UPDATE_SMTP,
  UPDATE_SEO,
  UPDATE_STORE_CURRENCY,
  UPDATE_STORE_ADDRESS,
  UPDATE_STORE_MEASUREMENTS,
  UPDATE_STORE_INVENTORY,
} from "../../queries/settingQuery";
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

export const getSettings = () => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  query(GET_SETTINGS).then((response) => {
    if (response) {
      return dispatch({
        type: SETTING_SUCCESS,
        payload: response.data.getSettings,
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

export const mediaUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_MEDIA, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateMedia,
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

export const smtpUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_SMTP, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateSMTP,
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

export const seoUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_SEO, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateSEO,
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

export const storeCurrencyUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_STORE_CURRENCY, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateStoreCurrency,
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

export const storeAddressUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_STORE_ADDRESS, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateStoreAddress,
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

export const storeMeasuresUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_STORE_MEASUREMENTS, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateStoreMeasurements,
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

export const storeInventoryUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_STORE_INVENTORY, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: response.data.updateStoreInventory,
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
