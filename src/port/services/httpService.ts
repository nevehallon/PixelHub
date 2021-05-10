import { toast } from "react-toastify";

import axios from "axios";

import getJwt from "./jwtService";

axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = getJwt && getJwt();
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(undefined, (error) => {
  const {
    response,
    response: { data },
  } = error;
  if (response && data.code >= 500) {
    const errorMessage =
      "We are sorry, but unexpected error occurred, please try again later.";
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 3000,
    });
  }
  if (
    !location.href.includes("sign-in") &&
    !location.href.includes("sign-up") &&
    response &&
    data.code === 401
  ) {
    localStorage.removeItem("localData");

    location.replace("/");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
