import Auth from "./auth";
import jumpTo from "./navigation";
import axios from "axios";
import { isEmpty, client_app_route_url } from "./helper";
import APclient from "../Client";

export const mutation = async (query, variables) => {
  try {
    const response = await APclient.mutate({
      mutation: query,
      variables,
    });
    return Promise.resolve(response);
  } catch (error) {
    const errors = JSON.parse(JSON.stringify(error));
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
  }
};

export const query = async (query, variables) => {
  try {
    const response = await APclient.query({
      query: query,
      variables,
      fetchPolicy: "no-cache", //fetchPolicy "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby"
    });
    return Promise.resolve(response);
  } catch (error) {
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
  }
};

const service = (config) => {
  //header authorization
  if (Auth.getToken()) {
    const token = Auth.getToken();
    config.headers = {
      authorization: token,
    };
  }

  //interceptors handle network error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      console.log(error);
      if (!error.response) {
        error.response = {
          data: "network error",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        Auth.logout();
        jumpTo(`${client_app_route_url}login`);
        throw error;
      }
      return Promise.reject(error);
    }
  );
  // config.baseURL = baseUrl;
  return axios(config);
};
export default service;

export const login = (email, password) => {
  let location = "http://localhost:8000";
  const body = {
    email: email,
    password: password,
  };
  return service({
    method: "POST",
    url: `${location}/api/users/login`,
    data: body,
  }).then(async (res) => {
    await Auth.setUserToken(res.data);
    return res;
  });
};

export const getUpdatedUrl = (table, url) => {
  let location = window.location.origin;
  return service({
    method: "POST",
    url: `${location}/api/misc/checkurl`,
    data: { url: url, table: table },
  }).then((res) => {
    if (res.data.success) {
      return Promise.resolve(res.data.url);
    }
  });
};

export const deleteProductVariation = (id) => {
  let location = window.location.origin;
  return service({
    method: "POST",
    url: `${location}/api/misc/delete_variation`,
    data: { id: id },
  }).then((res) => {
    if (res.data.success) {
      return Promise.resolve(true);
    }
  });
};

export const deleteProductVariationImage = (obj) => {
  let location = window.location.origin;
  return service({
    method: "POST",
    url: `${location}/api/misc/delete_image`,
    data: { image: obj },
  }).then((res) => {
    if (res.data.success) {
      return Promise.resolve(true);
    }
  });
};

export const getDashboardData = () => {
  let location = "http://localhost:8000";
  return service({
    method: "POST",
    url: `${location}/api/misc/dashboard_data`,
  }).then((res) => {
    if (res.data.success) {
      return Promise.resolve(res.data.dashBoardData);
    }
  });
};
