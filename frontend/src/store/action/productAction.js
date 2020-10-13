import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_SINGLE_PRODUCT,
  GET_CAT_PRODUCTS,
  GET_PRODUCT_REVIEWS,
  ADD_REVIEW,
  GET_FILTEREDPRODUCTS,
  GET_PRODUCTS_CATID,
  GET_FEATURED_PRODUCTS,
  GET_RECENT_PRODUCTS,
  ON_SALE_PRODUCTS,
} from "../../queries/productQuery";
import { mutation, query } from "../../utils/service";
// import jumpTo from "../../utils/navigation";

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
        type: PRODUCT_FAIL,
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
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const singleProductAction = (url) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_SINGLE_PRODUCT, { url: url })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCT_SUCCESS,
          payload: response.data.productbyurl,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

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
        type: CAT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const catProductAction = (url) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_CAT_PRODUCTS, { url: url })
    .then((response) => {
      if (response) {
        return dispatch({
          type: CAT_PRODUCTS,
          payload: response.data.productsbycaturl,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productReviewsAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCT_REVIEWS, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCT_REVIEWS,
          payload: response.data.productwisereview,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const productAddReviewAction = (object) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  mutation(ADD_REVIEW, object)
    .then((response) => {
      if (response) {
        dispatch({
          type: ADD_PRODUCT_REVIEWS,
          payload: response.data.addReviews,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};

export const filterProductAction = (config) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_FILTEREDPRODUCTS, { config })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCTS_SUCCESS,
          payload: response.data.filteredProducts,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};

export const getProductByCatIDAction = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_PRODUCTS_CATID, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: PRODUCTS_CATID_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const getFeaturedProductsAction = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_FEATURED_PRODUCTS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: FEATURED_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const getRecentProductsAction = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(GET_RECENT_PRODUCTS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: RECENT_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const getSaleProductsAction = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });
  query(ON_SALE_PRODUCTS)
    .then((response) => {
      if (response) {
        return dispatch({
          type: SALE_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_FAIL,
      });
      return dispatch({
        type: PRODUCT_FAIL,
        payload: { boolean: true, message: error, error: true },
      });
    });
};

export const CAT_LOADING = "CAT_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CAT_FAIL = "CAT_FAIL";
export const CAT_SUCCESS = "CAT_SUCCESS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const CAT_PRODUCTS = "CAT_PRODUCTS";
export const PRODUCT_REVIEWS = "PRODUCT_REVIEWS";
export const ADD_PRODUCT_REVIEWS = "ADD_PRODUCT_REVIEWS";

export const PRODUCTS_CATID_SUCCESS = "PRODUCTS_CATID_SUCCESS";
export const FEATURED_PRODUCTS_SUCCESS = "FEATURED_PRODUCTS_SUCCESS";
export const RECENT_PRODUCTS_SUCCESS = "RECENT_PRODUCTS_SUCCESS";
export const SALE_PRODUCTS_SUCCESS = "SALE_PRODUCTS_SUCCESS";
