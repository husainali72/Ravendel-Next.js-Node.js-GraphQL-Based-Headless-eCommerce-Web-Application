import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../queries/productQuery";
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

export const categoriesAction = () => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  query(GET_CATEGORIES)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "productCategories"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: CATS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const categoryAddAction = (object) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(ADD_CATEGORY, object)
    .then((response) => {
      dispatch({
        type: CAT_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addProductCategory"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(categoriesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const categoryUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(UPDATE_CATEGORY, object)
    .then((response) => {
      dispatch({
        type: CAT_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateProductCategory"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(categoriesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const categoryDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(DELETE_CATEGORY, { id })
    .then((response) => {
      dispatch({
        type: CAT_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteProductCategory"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(categoriesAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const productsAction = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCTS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "products"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: PRODUCTS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const productAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCT, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "product"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: PRODUCT_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const productAddAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  if (object.brand && object.brand.value) {
    object.brand = object.brand.value;
  }

  mutation(ADD_PRODUCT, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addProduct"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(productsAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });

      dispatch({
        type: TINYMCE_DESCRIPTION_NULL,
        payload: {},
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const productUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  if (object.brand && object.brand.value) {
    object.brand = object.brand.value;
  } else {
    object.brand = null;
  }

  mutation(UPDATE_PRODUCT, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateProduct"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(productsAction());
        navigate(`${client_app_route_url}all-products`);
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });

      dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const productDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  mutation(DELETE_PRODUCT, { id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteProduct"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(productsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const TINYMCE_DESCRIPTION = "TINYMCE_DESCRIPTION";
export const TINYMCE_DESCRIPTION_NULL = "TINYMCE_DESCRIPTION_NULL";
export const LOADING_FALSE = "LOADING_FALSE";

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
