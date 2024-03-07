import { BASE_URL, baseUrl, bucketBaseURL } from '../config';
import client from '../apollo-client';
import { isEmpty } from "./service";
import axios from 'axios'
import { getSession, signOut } from 'next-auth/react';
import NoImagePlaceHolder from '../components/images/NoImagePlaceHolder.png';
import { get } from 'lodash';
import logoutDispatch from '../redux/actions/userlogoutAction';

/* -------------------------------image funtion ------------------------------- */
export const imageOnError = (event) => {
    event.target.src = NoImagePlaceHolder.src
}
export const getImage = (img, type, isBanner, setting) => {
    if(!img){
        return NoImagePlaceHolder.src
    }
    let localStorage = setting && setting?.setting?.imageStorage?.status === 's3' ? false : (setting?.setting?.imageStorage?.status === 'localStorage' ? true : '')
    let imagaPath = ""
    if(type && type === "localStorage"){
        imagaPath = `https://${BASE_URL}/${img.toString()}`;
        return imagaPath.toString();
    }
    if (!isBanner) {
        imagaPath = NoImagePlaceHolder.src;
    }
    if (img) {
        imagaPath = localStorage ? baseUrl + img : bucketBaseURL + img
    }
    return imagaPath;

}
export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
/* -------------------------------Graphql query function ------------------------------- */
export const getHomepageData = async () => {
    try {
        const { data: homePageData } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        });
    }
    catch (e) {
        console.log("Categories Error=======", e);
    }
}
export const query = async (query, variables) => {
    const session = await getSession();
    const token = get(session,'user.accessToken.token')

    try {
        const response = await client.query({
            query: query,
            variables,
            fetchPolicy: 'network-only',
            context: {
                headers: { token },
            },
        });
        return Promise.resolve(response);
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        const { graphQLErrors, networkError } = errors;

        if (graphQLErrors?.length && !isEmpty(graphQLErrors[0]?.message)) {
            return Promise.reject(get(graphQLErrors[0], "message"));
          }
      
          if (networkError && networkError.statusCode === 400) {
            return Promise.reject(get(errors, "message"));
          }
      
          const networkErrorExtensions = get(
            networkError,
            "result.errors[0].extensions"
          );
          if (networkErrorExtensions?.code === 401) {
            logoutAndClearData() 
          }
        return Promise.reject("Something went wrong");
    }
};

/* -------------------------------Graphql mutation function ------------------------------- */

export const mutation = async (query, variables) => {
    const session = await getSession();
    const token = session?.user?.accessToken?.token

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
        const errors = JSON.parse(JSON.stringify(error));
        const { graphQLErrors, networkError } = errors;

        if (graphQLErrors?.length && !isEmpty(graphQLErrors[0]?.message)) {
            return Promise.reject(get(graphQLErrors[0], "message"));
          }
      
          if (networkError && networkError.statusCode === 400) {
            return Promise.reject(get(errors, "message"));
          }
      
          const networkErrorExtensions = get(
            networkError,
            "result.errors[0]"
          );
          if (get(networkErrorExtensions,'extensions.code') === 401) {
            return Promise.reject(networkErrorExtensions);
          }
        return Promise.reject("Something went wrong");
    }
};

export const logoutAndClearData = async (dispatch) => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    localStorage.setItem("userCart", JSON.stringify([]));
    localStorage.setItem("cart", JSON.stringify([]));
    dispatch(logoutDispatch())
    window.location.pathname = "/account";
  };
  

// autoFocus next input
export const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};

/* ------------------------------- Stripe payment function ------------------------------- */

export const stripeCheckout = (billDetails, cartItems, baseUrl) => {
    axios.post(`${baseUrl}/stripe/create-checkout-session`, {
        customerCart: cartItems,
        customerId: billDetails.customerId
    }).then(res => {
        if (res.data.url) {
            window.location.href = res.data.url
        }
    }).catch(err => console.log(err.message))
}

/* ------------------------------- set currency  ------------------------------- */

export const currencySetter = (settings, setCurrency) => {
    const currency = settings?.currencyOption?.currency || settings
    if (currency === "dollar") { setCurrency("$") }
    if (currency === "eur") { setCurrency(<i className="fas fa-euro-sign"></i>) }
    if (currency === "gbp") { setCurrency(<i className="fas fa-pound-sign"></i>) }
    if (currency === "cad") { setCurrency("CA$") }
}
export const getPrice = (price, decimal) => {
   let  formatedprice=formatNumber(price)
    let fixed = 3
    if (typeof formatedprice === 'string')
        return parseFloat(formatedprice)?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    else
        return typeof formatedprice === 'number' && formatedprice?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

}
export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

export const isDiscount = (product) => {
    const sellPrice = get(product, 'pricing.sellprice', 0);
    const price = get(product, 'pricing.price', 0);
    
    return sellPrice > 0 && sellPrice < price && ((100 / price) * (price - sellPrice)) > 0;
}

export const isVariantDiscount = (variantProduct) => {
    const sellPrice = get(variantProduct[0], 'pricing.sellprice', 0);
    const price = get(variantProduct[0], 'pricing.price', 0);
    const isDiscounted = sellPrice > 0 && sellPrice < price && ((100 / price) * (price - sellPrice)) > 0;

    return isDiscounted;
}

//Format a number value, returns the value if it's a valid number, otherwise returns '0'
export const formatNumber = (value) => (value && !isNaN(value) ? value : '0');