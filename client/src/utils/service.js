import Auth from "./auth";
import jumpTo from "./navigation";
import axios from "axios";
import { isEmpty } from "./helper";
import APclient from "../Client";

export const mutation = (query, variables) => {
  return APclient.mutate({
    mutation: query,
    variables
  })
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      const errors = JSON.parse(JSON.stringify(error));
      console.log(errors);
      if (
        errors.graphQLErrors.length &&
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
    });
};

export const query = (query, variables) => {
  return APclient.query({
    query: query,
    variables
  })
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      const errors = JSON.parse(JSON.stringify(error));
      console.log(error);
      if (
        errors.graphQLErrors.length &&
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
    });
};

const service = config => {
  //header authorization
  if (Auth.user_token) {
    const token = Auth.getToken();
    config.headers = {
      authorization: token
    };
  }

  //interceptors handle network error
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      if (!error.response) {
        error.response = {
          data: "net work error",
          status: 500
        };
      }
      if (error.response.status === 401) {
        Auth.logout();
        jumpTo("/login");
        throw error;
      }
      return Promise.reject(error);
    }
  );
  //config.baseURL = baseUrl;
  return axios(config);
};
export default service;

export const login = (email, password) => {
  const body = {
    email: email,
    password: password
  };
  return service({
    method: "POST",
    url: "api/users/login",
    data: body
  }).then(res => {
    Auth.setUserToken(res.data);
    return res;
  });
};
