import Auth from "./auth";
import jumpTo from "./navigation";
import axios from "axios";
import { isEmpty, baseUrl } from "./helper";

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
  config.baseURL = baseUrl;
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
