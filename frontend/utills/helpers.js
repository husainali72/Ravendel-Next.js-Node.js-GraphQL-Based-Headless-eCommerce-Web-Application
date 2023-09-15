import { IMAGE_BASE_URL, bucketBaseURL } from '../config';
import client from '../apollo-client';
import { isEmpty } from "./service";
import axios from 'axios'
import { getSession } from 'next-auth/react';
import NoImagePlaceHolder from '../components/images/NoImagePlaceHolder.png';

/* -------------------------------image funtion ------------------------------- */

// export const imgUrl = (img) => {
//     var imagaPath = "https://dummyimage.com/300"
//     if (img && img.original) {
//         imagaPath = bucketBaseURL + img.original
//     }
//     return imagaPath;
// }

// export const imgUrl2 = (img) => {
//     var imagaPath = "https://dummyimage.com/300"
//     if (img) {
//         imagaPath = bucketBaseURL + img
//     }
//     return imagaPath;
// }

export const getImage = (img, type, isBanner) => {

    let imagaPath = ""
    if (!isBanner) {
        imagaPath = NoImagePlaceHolder.src;
    }
    if (img) {
        imagaPath = bucketBaseURL + img
    }
    return imagaPath;

}

/* -------------------------------Graphql query function ------------------------------- */

export const query = async (query, id) => {
    const session = await getSession();
    const token = session?.user.accessToken.token
    try {
        const response = await client.query({
            query: query,
            variables: { id },
            fetchPolicy: 'network-only',
            context: {
                headers: { token },
            },
        });
        return Promise.resolve(response);
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        if (errors &&
            errors.graphQLErrors && errors.graphQLErrors?.length &&
            !isEmpty(errors.graphQLErrors[0].message)
        ) {
            return Promise.reject(errors.graphQLErrors[0].message);
        }
        if (
            !isEmpty(errors.networkError) &&
            errors.networkError.statusCode === 400
        ) {
            return Promise.reject(errors.message);
        }
        return Promise.reject("Something went wrong");
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
        const errors = JSON.parse(JSON.stringify(error));
        if (errors && errors.graphQLErrors &&
            errors.graphQLErrors?.length &&
            !isEmpty(errors.graphQLErrors[0].message)
        ) {
            return Promise.reject(errors.graphQLErrors[0].message);
        }
        if (
            !isEmpty(errors.networkError) &&
            errors.networkError.statusCode === 400
        ) {
            return Promise.reject(errors.message);
        }
        return Promise.reject("Something went wrong");
    }
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
    let fixed = 3
    if (typeof price === 'string')
        return parseInt(price)?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    else
        return typeof price === 'number' &&  price?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

}
export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

export const isDiscount = (product) => {
    if (product.pricing.sellprice > 0 &&
        product.pricing.sellprice < product.pricing.price &&
        ((100 / product?.pricing?.price) * (product?.pricing?.price - product?.pricing?.sellprice)) > 0) {
        return true;
    }
    else {
        return false;
    }
}

export const isVariantDiscount = (variantProduct) => {
    if (variantProduct[0]?.pricing.sellprice > 0 &&
        variantProduct[0].pricing.sellprice < variantProduct[0].pricing.price &&
        ((100 / variantProduct[0]?.pricing?.price) * (variantProduct[0]?.pricing?.price - variantProduct[0]?.pricing?.sellprice)) > 0) {
        return true;
    }
    else {
        return false;
    }
}
