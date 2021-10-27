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
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userEmailCheck/" + email,
  });
};

export const axiosOnNicknameCheck = function (nickname: String) {
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userNickNameCheck/" + nickname,
  });
};

export const axiosOnPhoneNumberCheck = function (phone: String) {
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userPhoneNumberCheck/" + phone,
  });
};

export const axiosOnSignUp = function (
  email: String,
  nickname: String,
  password: String,
  passwordCheck: String,
  phone: String
) {
  return axios({
    method: "POST",
    url: BASE_URL + "/user/",
    data: {
      email: email,
      nickname: nickname,
      password: password,
      passwordCheck: passwordCheck,
      phone: phone,
    },
  });
};
