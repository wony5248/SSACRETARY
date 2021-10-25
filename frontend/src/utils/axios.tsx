import axios from "axios";
import { BASE_URL } from "./statics";

const axiosOnSignIn = function (email: String, password: String) {
  return axios({
    method: "POST",
    url: BASE_URL + "/user/login",
    data: {
      email: email,
      password: password,
    },
  });
};

export { axiosOnSignIn };
