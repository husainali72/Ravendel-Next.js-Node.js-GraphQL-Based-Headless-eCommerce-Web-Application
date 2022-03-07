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
import {client_app_route_url, getResponseHandler, mutationResponseHandler} from '../../utils/helper';
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const categoriesAction = () => (dispatch) => {
  dispatch({
    type: CAT_LOADING,
  });
  query(GET_CATEGORIES)
    .then((response) => {
      // if (response && response.data && response.data.productCategories) {
      //   var productCategories = response.data.productCategories;
      //   if(productCategories.message.success){
      //     return dispatch({
      //       type: CATS_SUCCESS,
      //       payload: productCategories.data,
      //     });
      //   }else {
      //     return dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: { boolean: true, message: productCategories.message.message, error: true }
      //     });
      //   }
      // }
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
          payload: { boolean: true, message: message, error: true },
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
      dispatch({
        type: CAT_FAIL,
      });
      // if (response.data.addProductCategory.success) {
      //   dispatch(categoriesAction());
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Category added successfully",
      //       error: false,
      //     },
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.addProductCategory.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
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
      dispatch({
        type: CAT_FAIL,
      });
      // if (response.data.updateProductCategory.success) {

      //   dispatch(categoriesAction());

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Category updated successfully",
      //       error: false,
      //     },
      //   });

      //   return;
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.updateProductCategory.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
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
      dispatch({
        type: CAT_FAIL,
      });
      // if (response.data.deleteProductCategory.success) {
      //   dispatch(categoriesAction());
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Category deleted successfully",
      //       error: false,
      //     },
      //   });
      // }else {
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: { boolean: true, message: response.data.deleteProductCategory.message, error: true },
      //   });

      // }
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
          payload: { boolean: true, message: message, error: true },
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
      // if (response && response.data && response.data.products) {
      //   var products = response.data.products;
      //   if(products.message.success){
      //     return dispatch({
      //       type: PRODUCTS_SUCCESS,
      //       payload: products.data,
      //     });
      //   }else {
      //     return dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: { boolean: true, message: products.message.message, error: true }
      //     });
      //   }
      // }
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
          payload: { boolean: true, message: message, error: true },
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
      // if (response) {
      //   return dispatch({
      //     type: PRODUCT_SUCCESS,
      //     payload: response.data.product,
      //   });
      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log('Success', data)
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
  console.log(object)
  mutation(ADD_PRODUCT, object)
    .then((response) => {
      // if (response) {
      //   dispatch({
      //     type: PRODUCTS_SUCCESS,
      //     payload: response.data.addProduct,
      //   });

      //   dispatch({
      //     type: TINYMCE_DESCRIPTION_NULL,
      //     payload: {},
      //   });

      //   jumpTo(`${client_app_route_url}all-products`);

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Product added successfully",
      //       error: false,
      //     },
      //   });
      // }
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
          payload: { boolean: true, message: message, error: true },
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
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  if(object.brand && object.brand.value){
    object.brand = object.brand.value;
  }
  else{
    object.brand = null
  }
  
  // {object.brand.length > 0 ? (object.brand = object.brand.value) : (object.brand == null )}
  mutation(UPDATE_PRODUCT, object)
    .then((response) => {
      // if (response) {
      //   dispatch({
      //     type: PRODUCTS_SUCCESS,
      //     payload: response.data.updateProduct,
      //   });

      //   jumpTo(`${client_app_route_url}all-products`);

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Product updated successfully",
      //       error: false,
      //     },
      //   });

      //   return;
      // }
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
          payload: { boolean: true, message: message, error: true },
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
      // if (response) {
      //   dispatch({
      //     type: PRODUCTS_SUCCESS,
      //     payload: response.data.deleteProduct,
      //   });
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Product deleted successfully",
      //       error: false,
      //     },
      //   });
      // }
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
          payload: { boolean: true, message: message, error: true },
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
export const LOADING_FALSE = "LOADING_FALSE";

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
