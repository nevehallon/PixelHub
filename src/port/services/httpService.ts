import { toast } from "react-toastify";

import axios from "axios";

import getJwt from "./jwtService";

axios.defaults.headers.common.Authorization = getJwt && getJwt();

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
  if (response && data.code === 401) {
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
