import axios from "axios";
import { BASE_URL } from "./statics";

export const userAPI = {
  axiosOnSignIn : async (email:String, password:String) => {
    return await axios({
      method: "POST",
      url: BASE_URL + "/user/login",
      data: {
        email: email,
        password: password,
      },
    });
  }
}


