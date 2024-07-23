/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import { IMAGE_BASE_URL, BUCKET_BASE_URL } from "../config";
import client from "../apollo-client";
import { isEmpty } from "./service";
import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
import NoImagePlaceHolder from "../components/images/NoImagePlaceHolder.png";
import { get } from "lodash";
import logoutDispatch from "../redux/actions/userlogoutAction";
import moment from "moment";
import {
  BANKTRANSFER,
  CASH_ON_DELIVERY,
  PAYPAL,
  RAZORPAY,
  STRIPE,
} from "./constant";
import notify from "./notifyToast";
import { outOfStockMessage } from "../components/validationMessages";
import { createCart } from "../redux/actions/cartAction";
/* -------------------------------image funtion ------------------------------- */
export const imageOnError = (event) => {
  event.target.src = NoImagePlaceHolder.src;
};
export const getImage = (img, type, isBanner, setting) => {
  if (!img) {
    return NoImagePlaceHolder.src;
  }
  let imagaPath = "";
  if (!isBanner) {
    imagaPath = NoImagePlaceHolder.src;
  }
  if (img) {
    imagaPath =
      type && type === "localStorage"
        ? IMAGE_BASE_URL + img
        : BUCKET_BASE_URL + img;
  }
  return imagaPath;
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
/* -------------------------------Graphql query function ------------------------------- */
export const handleGraphQLErrors = (error) => {
  if (!error) {
    return Promise.reject("Something went wrong");
  }
  const parsedError = JSON.parse(JSON.stringify(error));
  const { graphQLErrors, networkError } = parsedError;
  if (graphQLErrors?.length && !isEmpty(get(graphQLErrors, "[0].message"))) {
    return Promise.reject(get(graphQLErrors, "[0].message"));
  }
  if (networkError && get(networkError, "statusCode") === 400) {
    return Promise.reject(get(parsedError, "message"));
  }
  const networkErrorExtensions = get(networkError, "result.errors[0]");
  if (get(networkErrorExtensions, "extensions.code") === 401) {
    return Promise.reject(networkErrorExtensions);
  }
  return Promise.reject("Something went wrong");
};

export const query = async (query, variables) => {
  const session = await getSession();
  const token = get(session, "user.accessToken.token");

  try {
    const response = await client.query({
      query: query,
      variables,
      fetchPolicy: "network-only",
      context: {
        headers: { token },
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return handleGraphQLErrors(error);
  }
};

/* -------------------------------Graphql mutation function ------------------------------- */

export const mutation = async (query, variables) => {
  const session = await getSession();
  const token = session?.user?.accessToken?.token;

  try {
    if (!variables.queryName) {
      var response = await client.mutate({
        mutation: query,
        variables,
        context: {
          headers: { Authorization: token },
        },
      });
    } else {
      var response = await client.mutate({
        mutation: query,
        variables,
      });
    }
    /////////////////////////////////////////////////////
    return Promise.resolve(response);
  } catch (error) {
    return handleGraphQLErrors(error);
  }
};
export const queryWithoutToken = async (query, variables) => {
  try {
    const response = await client.query({
      query: query,
      variables,
      fetchPolicy: "network-only",
    });
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    return handleGraphQLErrors(error);
  }
};
export const mutationWithoutToken = async (query, variables) => {
  try {
    if (!variables.queryName) {
      var response = await client.mutate({
        mutation: query,
        variables,
      });
    } else {
      var response = await client.mutate({
        mutation: query,
        variables,
      });
    }
    /////////////////////////////////////////////////////
    return Promise.resolve(response);
  } catch (error) {
    return handleGraphQLErrors(error);
  }
};
export const logoutAndClearData = async (dispatch, router) => {
  const data = await signOut({ redirect: false, callbackUrl: "/" });
  await removeItemFromLocalStorage("cart");
  await dispatch(logoutDispatch());
  window.location.pathname = "/login";
};

// autoFocus next input
export const handleEnter = (event) => {
  if (get(event, "key")?.toLowerCase() === "enter") {
    const form = get(event, "target.form");
    const index = [...form].indexOf(get(event, "target"));
    form.elements[index + 1].focus();
    event.preventDefault();
  }
};

/* ------------------------------- Stripe payment function ------------------------------- */

export const stripeCheckout = (billDetails, cartItems, baseUrl) => {
  axios
    .post(`${baseUrl}/stripe/create-checkout-session`, {
      customerCart: cartItems,
      customerId: billDetails.customerId,
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err.message));
};

/* ------------------------------- set currency  ------------------------------- */

export const currencySetter = (settings, setCurrency) => {
  const currency = get(settings, "currency", "usd") || settings;
  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
    cad: "CA$",
    inr: "₹",
  };
  const selectedSymbol = currencySymbols[currency];
  if (selectedSymbol) setCurrency(selectedSymbol);
};

export const formattedPrice = (value, currencyOptions) => {
  const decimal = get(currencyOptions, "number_of_decimals", "2");
  const thousandSeparator = get(currencyOptions, "thousand_separator", ",");
  const decimalSeparator = get(currencyOptions, "decimal_separator", ".");
  return value
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    .replace(".", decimalSeparator);
};
export const getPrice = (price, currencyOptions) => {
  let fixed = 3;
  if (typeof price === "string") {
    return formattedPrice(parseFloat(price), currencyOptions);
  } else if (typeof price === "number") {
    return formattedPrice(price, currencyOptions);
  }

  return "0.00";
};
export const isDiscount = (product) => {
  const sellPrice = get(product, "pricing.sellprice", 0);
  const price = get(product, "pricing.price", 0);

  if (sellPrice && sellPrice > 0 && price && price > 0 && sellPrice < price) {
    const discountAmount = ((100 / price) * (price - sellPrice)).toFixed(2);
    return Math.round(discountAmount) > 0;
  }
  return false;
};

export const isVariantDiscount = (variantProduct) => {
  const sellPrice = get(variantProduct, "[0].pricing.sellprice", 0);
  const price = get(variantProduct, "[0].pricing.price", 0);
  const isDiscounted =
    sellPrice > 0 &&
    sellPrice < price &&
    (100 / price) * (price - sellPrice) > 0;

  return isDiscounted;
};

//Format a number value, returns the value if it's a valid number, otherwise returns '0'
export const formatNumber = (value) => (value && !isNaN(value) ? value : "0");

// ---------------------------------------------LocalStorage-------------------------
export const getItemFromLocalStorage = (key,defaultValue=[]) => {
  try {
    if (!localStorage.hasOwnProperty(key)) {
      return defaultValue||[]; // Key does not exist in localStorage
    }
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    return [];
  }
};

export const setItemToLocalStorage = (key, value) => {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {}
};

export const removeItemFromLocalStorage = (key) => {
  try {
    if (!localStorage.hasOwnProperty(key)) {
      return;
    }
    localStorage.removeItem(key);
  } catch (error) {}
};

export const formatDate = (date) =>
  new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

export const convertDateToStringFormat = (date, setting) => {
  const selectedDateFormat = get(setting, "setting.general.date_format", "");
  let convertedDate = "";
  if (date) {
    switch (selectedDateFormat) {
      case "1":
        convertedDate = moment(date).format("MMMM D, YYYY");
        break;
      case "2":
        convertedDate = moment(date).format("YYYY-MM-DD");
        break;
      case "3":
        convertedDate = moment(date).format("MM/DD/YYYY");
        break;
      case "4":
        convertedDate = moment(date).format("DD/MM/YYYY");
        break;
      default:
        convertedDate = moment(date).format("ll");
        break;
    }
  } else {
    convertedDate = date;
  }
  return convertedDate;
};

export const handleError = (error, dispatch, router) => {
  const status = get(error, "extensions.code");
  if (status === 401) {
    logoutAndClearData(dispatch,router);
  }
};
export const getProductSellPrice = (product) => {
  const sellPrice = get(product, "pricing.sellprice");
  const price = get(product, "pricing.price", 0);
  return sellPrice ? formatNumber(sellPrice) : formatNumber(price);
};
export const isPriceZero = (price) => {
  return price === 0;
};
export const isCouponAppliedAndNotFreeShipping = (couponCartDetail) => {
  return (
    get(couponCartDetail, "couponApplied") &&
    !get(couponCartDetail, "isCouponFreeShipping")
  );
};
export const logout = async () => {
  const data = await signOut({ redirect: false, callbackUrl: "/" });
};
export const iconSetter = (iconName) => {
  if ("twitter" === iconName) {
    return "fab fa-twitter mx-2 icon-footer";
  }
  if ("facebook" === iconName) {
    return "fab fa-facebook mx-2 icon-footer";
  }
  if ("instagram" === iconName) {
    return "fab fa-instagram mx-2 icon-footer";
  }
  if ("youtube" === iconName) {
    return "fab fa-youtube mx-2 icon-footer";
  }
  if ("pinterest" === iconName) {
    return "fab fa-pinterest mx-2 icon-footer";
  }
};

export const checkPaymentMethod = (paymentMethod) => {
  return (
    paymentMethod === STRIPE ||
    paymentMethod === PAYPAL ||
    paymentMethod === RAZORPAY
  );
};

export const generateCategoryUrl = (slug) => {
  let url = slug || "#";
  return {
    href: `/collection/[categorys]?url=/${url}`,
    as: `/collection/${url}`,
  };
};

export const getPaymentMethodLabel = (paymentMethod) => {
  switch (paymentMethod) {
    case CASH_ON_DELIVERY:
      return "Cash On Delivery";
    case STRIPE:
      return "Stripe";
    case PAYPAL:
      return "Paypal";
    case RAZORPAY:
      return "Razor Pay";
    case BANKTRANSFER:
      return "Bank Transfer";
    default:
      return "Cash On Delivery";
  }
};

export const isCurrentCategory = (url, router) => {
  const { category } = router.query;
  return category === url;
};

export const isAnyProductOutOfStock = (products) => {
  const outOfStockProduct = products?.some((product) => !product.available);
  if (outOfStockProduct) {
    notify(outOfStockMessage);
  }
  return outOfStockProduct;
};

export const loginCustomer = async (
  loginUser,
  setLoading,
  dispatch,
  router,
  setError
) => {
  setLoading(true);
  try {
    const response = await signIn("credentials", {
      email: loginUser.email,
      password: loginUser.password,
      redirect: false,
    });
    const session = await getSession();
    const error = get(response, "error");
    const status = get(response, "status");
    const success = get(response, "ok");
    if (error) {
      setLoading(false);
      setError(
        status === 401 && error === "Invalid Email or Password"
          ? error
          : "Something went wrong"
      );
    } else {
      setLoading(false);
      setError(null);
    }
    if (success) {
      setLoading(false);
      const productsInCart = getItemFromLocalStorage("cart");
      const id = get(session, "user.accessToken.customer._id");
      const products = productsInCart?.map((product) => {
        const {
          _id,
          name,
          pricing,
          feature_image,
          shippingClass,
          taxClass,
          variantId,
          quantity,
          attributes,
        } = product;
        return {
          productId: _id,
          productTitle: name,
          productPrice: pricing?.toString(),
          productImage: feature_image,
          shippingClass: shippingClass,
          taxClass: taxClass,
          variantId: variantId,
          qty: quantity,
          attributes: attributes,
        };
      });
      dispatch(createCart(id, products));
    }
    if (response.ok) {
      let pathName = getItemFromLocalStorage("previousPage",'/')
      removeItemFromLocalStorage("previousPage");
      await router.push(pathName);
    }
  } catch (error) {
    setLoading(false);
    setError("Something went wrong");
  }
};

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.replace(/\D/g, '');
  const countryCode = digits.slice(0, 2);
  const firstPart = digits.slice(2, 7);
  const secondPart = digits.slice(7);

  // Return formatted phone number
  return `+${countryCode} ${firstPart}-${secondPart}`;
};