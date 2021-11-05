import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { TextField, Button, Alert } from "@mui/material";

import AppAppBar from "../../views/AppAppBar";
import Btn from "../../components/Button";
import { Userprofilediv, Formdiv } from "./style";
import {
  axiosOnNicknameCheck,
  axiosOnPhoneNumberCheck,
  axiosOnChangeProfile,
  axiosOnWithdrawl,
} from "../../utils/axios";
import { onPhoneRegexCheck } from "../../utils/regex";

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 613 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return isMobile ? children : null;
};

const UserProfile: React.FunctionComponent<RouteComponentProps> = (props) => {
  const localEmail = localStorage.getItem("email");
  const localNickname = localStorage.getItem("nickname");
  const localPhone = localStorage.getItem("phone");
  const localJWT = localStorage.getItem("jwt");

  const [inputs, setInputs] = useState({
    email: localEmail !== null ? localEmail : "",
    nickname: localNickname !== null ? localNickname : "",
    phone: localPhone !== null ? localPhone : "",
  });

  const { email, nickname, phone } = inputs;

  const [checks, setChecks] = useState({
    nicknameCheck: "dafualt",
    phoneCheck: "default",
    phoneRegexCheck: "default",
  });

  const { nicknameCheck, phoneCheck, phoneRegexCheck } = checks;

  const [messages, setMessages] = useState({
    message: "",
    phoneMessage: "",
  });

  const { message, phoneMessage } = messages;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "nickname") {
      setChecks({
        ...checks,
        nicknameCheck: "default",
      });
    } else if (name === "phone") {
      if (onPhoneRegexCheck(phone)) {
        setChecks({
          ...checks,
          phoneRegexCheck: "available",
          phoneCheck: "default",
        });
        setMessages({
          ...messages,
          phoneMessage: "",
        });
      } else {
        setChecks({
          ...checks,
          phoneRegexCheck: "not available",
          phoneCheck: "default",
        });
        setMessages({
          ...messages,
          phoneMessage: "Phone format is wrong",
        });
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onNicknameCheck = function () {
    if (nickname.trim() !== "") {
      axiosOnNicknameCheck(nickname)
        .then((res: any) => {
          console.log(res.status);
          if (res.status === 200) {
            setChecks({
              ...checks,
              nicknameCheck: "available",
            });
          }
        })
        .catch((error: any) => {
          if (error.response.data.statusCode === 400) {
            setChecks({
              ...checks,
              nicknameCheck: "not available",
            });
          }
        });
    } else {
      alert("nickname isn't allowed to be empty");
    }
  };

  const onPhoneCheck = function () {
    if (phone.trim() !== "") {
      axiosOnPhoneNumberCheck(phone)
        .then((res: any) => {
          if (res.status === 200) {
            setChecks({
              ...checks,
              phoneCheck: "available",
            });
            setMessages({
              ...messages,
              phoneMessage: "",
            });
          }
        })
        .catch((error: any) => {
          if (error.response.data.statusCode === 400) {
            setChecks({
              ...checks,
              phoneCheck: "not available",
            });
            setMessages({
              ...messages,
              phoneMessage: "Phone number isn't available",
            });
          }
        });
    } else {
      alert(
        "Phone isn't required. But if you want to use, then please fill with something in phone"
      );
    }
  };

  const onChangeProfile = function () {
    if (nicknameCheck !== "available") {
      setMessages({
        ...messages,
        message: "Nickname check failed",
      });
      return;
    }
    if (phone.trim() !== "") {
      if (phoneCheck !== "available" || phoneRegexCheck !== "available") {
        setMessages({
          ...messages,
          message: "Phone number check failed",
        });
        return;
      }
    }
    axiosOnChangeProfile(
      localJWT !== null ? localJWT : "",
      email,
      nickname,
      phone
    )
      .then((res: any) => {
        if (res.data.statusCode === 200) {
          console.log(res.data);
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("nickname", res.data.nickname);
          localStorage.setItem("phone", res.data.phoneNum);
          props.history.push("/settingprofile");
        } else {
          setMessages({
            ...messages,
            message: res.data.message,
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.statusCode === 400) {
          setMessages({
            ...messages,
            message: error.response.data.message,
          });
        } else {
          console.log(error.response);
        }
      });
  };

  const onWithdrawl = function () {
    axiosOnWithdrawl(localJWT !== null ? localJWT : "", email)
      .then((res: any) => {
        if (res.data.statusCode === 200) {
          localStorage.clear();
          props.history.push("/");
        } else {
          console.log(res.data);
        }
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 400) {
          console.log(error.response.data);
          setMessages({
            ...messages,
            message: error.response.data.message,
          });
        } else {
          console.log(error.response);
        }
      });
  };
  //   const isMobile = useMediaQuery({ maxWidth: 612 });
  return (
    <div>
      {/* {isMobile ? <AppAppBar /> : undefined} */}
      <AppAppBar />
      <Desktop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv style={{ marginTop: "72px", fontSize: "28px" }}>
            Profile
          </Userprofilediv>
          <Formdiv
            style={{
              width: "500px",
              height: "500px",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                disabled
                label="Email"
                name="email"
                onChange={onChange}
                value={email}
                required
                style={{ width: "100%", backgroundColor: "#E6E6E6" }}
              ></TextField>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={nicknameCheck === "not available" ? true : false}
                label="Nickname"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={
                  nicknameCheck === "not available"
                    ? "Your nickname isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: "10px", height: "55px" }}
                color={nicknameCheck === "available" ? "success" : "primary"}
                onClick={onNicknameCheck}
              >
                AVAILITY
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={
                  phoneCheck === "not available" ||
                  phoneRegexCheck === "not available"
                    ? true
                    : false
                }
                label="Phone"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={phoneMessage}
              ></TextField>
              <Button
                variant="contained"
                size="small"
                disabled={phoneRegexCheck === "available" ? false : true}
                style={{ marginLeft: "10px", height: "55px" }}
                color={phoneCheck === "available" ? "success" : "primary"}
                onClick={onPhoneCheck}
              >
                AVAILITY
              </Button>
            </div>
          </Formdiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
          <Btn
            style={{ width: "500px" }}
            name="CHANGE PROFILE"
            onClick={onChangeProfile}
          ></Btn>
          <Btn
            style={{ width: "500px", backgroundColor: "#D62B4B" }}
            name="WITHDRAWL"
            onClick={onWithdrawl}
          ></Btn>
        </div>
      </Desktop>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv>Profile</Userprofilediv>
          <Formdiv>
            <div style={{ width: "100%" }}>
              <TextField
                label="Email"
                name="email"
                onChange={onChange}
                value={email}
                required
                style={{ width: "100%", backgroundColor: "#E6E6E6" }}
              ></TextField>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={nicknameCheck === "not available" ? true : false}
                label="Nickname"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={
                  nicknameCheck === "not available"
                    ? "Your nickname isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: "10px", height: "55px" }}
                color={nicknameCheck === "available" ? "success" : "primary"}
                onClick={onNicknameCheck}
              >
                AVAILITY
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={phoneCheck === "not available" ? true : false}
                label="Phone"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={
                  phoneCheck === "not available"
                    ? "Your phone number isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                disabled={phoneRegexCheck === "available" ? false : true}
                size="small"
                style={{ marginLeft: "10px", height: "55px" }}
                color={phoneCheck === "available" ? "success" : "primary"}
                onClick={onPhoneCheck}
              >
                AVAILITY
              </Button>
            </div>
          </Formdiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
          <Btn name="CHANGE PROFILE" onClick={onChangeProfile}></Btn>
          <Btn
            style={{ backgroundColor: "#D62B4B" }}
            name="WITHDRAWL"
            onClick={onWithdrawl}
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default UserProfile;
