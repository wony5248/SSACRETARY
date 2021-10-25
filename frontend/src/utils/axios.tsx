import axios from "axios";
import { BASE_URL } from "./statics";

export const axiosOnSignIn = function (email: String, password: String) {
  return axios({
    method: "POST",
    url: BASE_URL + "/user/login",
    data: {
      email: email,
      password: password,
    },
  });
};

export const axiosOnEmailCheck = function (email: String) {
  console.log(BASE_URL + "/userEmailCheck/" + email);
  return axios({
    method: "GET",
    url: BASE_URL + "/userEmailCheck/" + email,
  });
};

export const axiosOnNicknameCheck = function (nickname: String) {
  return axios({
    method: "GET",
    url: BASE_URL + "/userNickNameCheck/" + nickname,
  });
};

export const axiosOnPhoneNumberCheck = function (phone: String) {
  return axios({
    method: "GET",
    url: BASE_URL + "/userPhoneNumberCheck/" + phone,
  });
};
