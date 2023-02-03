import { IMAGE_BASE_URL, bucketBaseURL } from '../config';
import client from '../apollo-client';
import { isEmpty } from "./service";
import axios from 'axios'
import { getSession } from 'next-auth/react';


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

export const getImage = (img, type) => {
    var imagaPath = "https://dummyimage.com/300"
    if (img && img[type]) {
        imagaPath = bucketBaseURL + img[type]
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
        console.log("err",error);
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
        /////////////////////////////////////////////////////
        // console.log(variables.queryName)
        if(!variables.queryName){
            var response = await client.mutate({
                mutation: query,
                variables,
                context: {
                    headers: { Authorization: token },
                },
            });
        }else{
            var response = await client.mutate({
                mutation: query,
                variables,
            });
        }
        /////////////////////////////////////////////////////
        return Promise.resolve(response);
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        console.log(errors);
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
        // console.log([...form])
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};

/* ------------------------------- Stripe payment function ------------------------------- */

export const stripeCheckout=(billDetails, cartItems, baseUrl)=>{
    console.log("paybtn for detailsOfBill", billDetails, "cartitems====", cartItems)
    // const customerItems=billDetails.products
    axios.post(`${baseUrl}/stripe/create-checkout-session`, {
        customerCart: cartItems,
        customer_id: billDetails.customer_id
    }).then(res=>{
        if(res.data.url){
            window.location.href=res.data.url
        }
    }).catch(err=>console.log(err.message))
}

