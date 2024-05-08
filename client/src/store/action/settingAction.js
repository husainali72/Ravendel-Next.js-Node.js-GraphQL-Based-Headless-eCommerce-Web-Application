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
  UPDATE_PAYMENT_COD,
  UPDATE_PAYMENT_BANK,
  UPDATE_PAYMENT_STRIPE,
  UPDATE_PAYMENT_PAYPAL,
  UPDATE_PAYMENT_RAZORPAY,
  UPDATE_APPEARANCE_THEME,
  UPDATE_APPEARANCE_HOME_NEW,
  UPDATE_APPEARANCE_MOBILE_NEW,
  UPDATE_NOTIFICATION_ONESIGNAL,
  UPDATE_STORE_ORDER,
  ADD_ZIPCODE,
  GET_ZIPCODE,
  UPDATE_ZIPCODE,
  DELETE_ZIPCODE,
  UPDATE_IMAGE_STORAGE,
  UPLOAD_ZIPCODE_FILE,
} from "../../queries/settingQuery";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import { mutationResponseHandler } from "../../utils/helper";
import { get } from "lodash";

export const getDatesAction = () => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  query(GET_DATES).then((response) => {
    if (response) {
      return dispatch({
        type: LIST_DATE_FORMAT,
        payload: get(response,'data.getDateformat'),
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
        payload: get(response,'data.getSettings'),
      });
    }
  });
};
export const getZipCode = (id) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  query(GET_ZIPCODE, { id })
    .then((response) => {
      if (response) {
        dispatch(getSettings());
        return dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.zipcode.data'),
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
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
          payload: get(response,'data.updateGeneral'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateMedia'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateSMTP'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateSEO'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateStoreCurrency'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateStoreAddress'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateStoreMeasurements'),
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
        payload: { boolean: false, message: error, error: true },
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
          payload: get(response,'data.updateStoreInventory'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const paymentCodUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_PAYMENT_COD, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updatePaymnetCOD'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const paymentBankUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_PAYMENT_BANK, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updatePaymnetBank'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const paymentStripeUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_PAYMENT_STRIPE, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updatePaymnetStripe'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const paymentPaypalUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_PAYMENT_PAYPAL, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response, "data.updatePaymentPaypal"),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const paymentRazorPayUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_PAYMENT_RAZORPAY, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response, "data.updatePaymentRazorpay"),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const oneSignalUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_NOTIFICATION_ONESIGNAL, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateNotificationOneSignal'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const orderOptionUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_STORE_ORDER, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateStoreOrder'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const ImageStorageUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_IMAGE_STORAGE, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateImageStorage'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const zipCodeAddAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(ADD_ZIPCODE, object)
    .then((response) => {
      dispatch({
        type: LOADING_FALSE,
      });
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addZipcode"
      );

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }
      if (success) {
        dispatch(getSettings());
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SETTING_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const zipCodeUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_ZIPCODE, object)
    .then((response) => {
      dispatch({
        type: LOADING_FALSE,
      });
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateZipcode"
      );
      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }
      if (success) {
        dispatch(getSettings());
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SETTING_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const zipCodeUploadFileAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPLOAD_ZIPCODE_FILE, object)
    .then((response) => {
      dispatch({
        type: LOADING_FALSE,
      });
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addZipCodeUsingFile"
      );
      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }
      if (success) {
        dispatch(getSettings());
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SETTING_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const zipCodeDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(DELETE_ZIPCODE, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: LOADING_FALSE,
        });
        dispatch(getSettings());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: get(response,'data.deleteZipcode.message'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const appearanceHomeUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_APPEARANCE_HOME_NEW, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateAppearanceHome'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const appearanceMobileUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_APPEARANCE_MOBILE_NEW, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateAppearanceMobile'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const appearanceThemeUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: SETING_LOADING,
  });
  mutation(UPDATE_APPEARANCE_THEME, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: SETTING_SUCCESS,
          payload: get(response,'data.updateAppeanranceTheme'),
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
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const SETING_LOADING = "SETING_LOADING";
export const SETTING_SUCCESS = "SETTING_SUCCESS";
export const SETTING_FAIL = "SETTING_FAIL";
export const LIST_DATE_FORMAT = "LIST_DATE_FORMAT";
export const LOADING_FALSE = "LOADING_FALSE";