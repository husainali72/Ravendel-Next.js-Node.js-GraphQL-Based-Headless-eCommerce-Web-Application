import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { onError } from 'apollo-link-error'
import { useSession } from "next-auth/react"
import jwt from "next-auth/jwt"

// const httpLink = new createUploadLink({ uri: `https://demo1.ravendel.io/graphql` });
const httpLink = new createUploadLink({ uri: `http://localhost:8000/graphql` });
// const httpLink = new createUploadLink({ uri: `http://192.168.1.6:8000/graphql` });
// const httpLink = new createUploadLink({ uri: `https://ravendel.herokuapp.com/graphql` });

const authLink = new ApolloLink((operation, forward) => {

  var token = ""
  if (typeof window !== "undefined") {
    token = JSON.parse(localStorage.getItem("customer"))

    // token = JSON.parse(localStorage.getItem("session"))
    // console.log("Authorization token:", token.token)
    // console.log("localstorage")
  }
  else {
    // console.log('You are on the server')
    // 👉️ can't use localStorage
  }

  // Use the setContext method to set the HTTP headers.
  // operation.setContext({
  //   headers: {
  //     authorization: ''
  //   }
  // });
  // Call the next link in the middleware chain.
  return forward(operation);
});


const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  // uri: "https://countries.trevorblades.com",
  // uri: "/graphql",
  ///////////////////////////////////////////////
  link: authLink.concat(httpLink),
  ///////////////////////////////////////////////
  // link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
  // onError: (e) => { console.log('Error', e) },
});

export default client;
