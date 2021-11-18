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

export const crawlAPI = {
  addSetting : async (jwt: any, email: any, type: string, keyword: string[], url: string, period:number, mailAlarm: boolean, smsAlarm: boolean, name: string) => {
    return await axios({
      method: "POST",
      url: BASE_URL + "/crawling/",
      headers: {
        Authorization: jwt,
      },
      data:{
        email:email,
        keywords:keyword,
        mailAlarm:mailAlarm,
        name: name,
        period:period,
        smsAlarm: smsAlarm,
        type: type,
        url: url,
        

      }
    })
  },
  getAllSettings : async (jwt: any) => {
    return await axios({
      method: "GET",
      url: BASE_URL + "/crawling/",
      headers: {
        Authorization: jwt,
      },
      }
    )
  },
  getSettingDetail : async (jwt: any, settingId:string) => {
    return await axios({
      method: "GET",
      url: BASE_URL + `/crawling/detail/${settingId}`,
      headers: {
        Authorization: jwt,
      },
      }
    )
  },
  editSetting : async (crawlingID:number,jwt:any, email:any, keywords:string[], mailAlarm:boolean, name:string, period:number, smsAlarm:boolean, type:string, url:string) => {
    return await axios({
      method: "PUT",
      url: BASE_URL + `/crawling/`,
      headers: {
        Authorization: jwt,
      },
      data:{
        email:email,
        keywords:keywords,
        mailAlarm:mailAlarm,
        name:name,
        period:period,
        settingId:crawlingID,
        smsAlarm:smsAlarm,
        type:type,
        url:url
      }
      }
    )
  },
  deleteSetting : async (crawlingID:number,jwt:any, email:any) => {
    return await axios({
      method: "DELETE",
      url: BASE_URL + `/crawling/${crawlingID}/`,
      headers: {
        Authorization: jwt,
      },
      data:{
        email:email,
        settingId:crawlingID
      }
      }
    )
  },
  getAllLog : async (jwt:any) => {
    return await axios({
      method: "GET",
      url: BASE_URL + `/crawling/log/`,
      headers: {
        Authorization: jwt,
      },

      }
    )
  },
}