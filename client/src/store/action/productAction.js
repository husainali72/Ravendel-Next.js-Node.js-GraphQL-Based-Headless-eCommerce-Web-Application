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

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const categoriesAction = () => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  query(GET_CATEGORIES)
    .then((response) => {
      if (response) {
        return dispatch({
          type: CATS_SUCCESS,
          payload: response.data.productCategories,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const categoryAddAction = (object) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(ADD_CATEGORY, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.addProductCategory,
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Category added successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: false },
      });
    });
};

export const categoryUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(UPDATE_CATEGORY, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.updateProductCategory,
        });

        //jumpTo("/all-blogs");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Category updated successfully",
            error: false,
          },
        });

        return;
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const categoryDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  mutation(DELETE_CATEGORY, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: CATS_SUCCESS,
          payload: response.data.deleteProductCategory,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Category deleted successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CAT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productsAction = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCTS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.products,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCT, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCT_SUCCESS,
          payload: response.data.product,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productAddAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  if(object.brand && object.brand.value){
    object.brand = object.brand.value;
  }
  mutation(ADD_PRODUCT, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.addProduct,
        });

        dispatch({
          type: TINYMCE_DESCRIPTION_NULL,
          payload: {},
        });

        jumpTo("/all-products");

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Product added successfully",
            error: false,
          },
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  console.log("befor obje", object);
  if(object.brand && object.brand.value){
    object.brand = object.brand.value;
  }
  mutation(UPDATE_PRODUCT, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.updateProduct,
        });

        jumpTo("/all-products");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Product updated successfully",
            error: false,
          },
        });

        return;
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  mutation(DELETE_PRODUCT, { id })
    .then((response) => {
      if (response) {
        dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.deleteProduct,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Product deleted successfully",
            error: false,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const TINYMCE_DESCRIPTION = "TINYMCE_DESCRIPTION";
export const TINYMCE_DESCRIPTION_NULL = "TINYMCE_DESCRIPTION_NULL";

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
