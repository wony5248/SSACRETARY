import { Email } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "./statics";

export const axiosOnSignIn = function (email: string, password: string) {
  return axios({
    method: "POST",
    url: BASE_URL + "/user/login",
    data: {
      email: email,
      password: password,
    },
  });
};

export const axiosOnEmailCheck = function (email: string) {
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userEmailCheck/" + email,
  });
};

export const axiosOnNicknameCheck = function (nickname: string) {
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userNickNameCheck/" + nickname,
  });
};

export const axiosOnPhoneNumberCheck = function (phone: string) {
  return axios({
    method: "GET",
    url: BASE_URL + "/user/userPhoneNumberCheck/" + phone,
  });
};

export const axiosOnSignUp = function (
  email: string,
  nickname: string,
  password: string,
  passwordCheck: string,
  phone: string
) {
  return axios({
    method: "POST",
    url: BASE_URL + "/user/",
    data: {
      email: email,
      nickname: nickname,
      password: password,
      passwordCheck: passwordCheck,
      phoneNum: phone,
    },
  });
};

export const axiosOnChangeProfile = function (
  jwt: string,
  email: string,
  nickname: string,
  phone: string
) {
  return axios({
    method: "PUT",
    url: BASE_URL + "/user/",
    headers: {
      Authorization: jwt,
    },
    data: {
      email: email,
      nickname: nickname,
      phoneNum: phone,
    },
  });
};

export const axiosOnWithdrawl = function (jwt: string, email: string) {
  return axios({
    method: "DELETE",
    url: BASE_URL + "/user/",
    headers: {
      Authorization: jwt,
    },
    data: {
      email: email,
    },
  });
};
