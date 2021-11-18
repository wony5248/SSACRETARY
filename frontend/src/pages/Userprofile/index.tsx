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
          phoneMessage: "전화번호 형식에 맞지 않습니다",
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
          // console.log(res.status);
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
      alert("닉네임은 필수값입니다.");
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
              phoneMessage: "이미 등록된 전화번호입니다.",
            });
          }
        });
    } else {
      alert("전화번호는 필수는 아니나, 빈 값을 사용하실 수 없습니다.");
    }
  };

  const onChangeProfile = function () {
    if (nicknameCheck !== "available") {
      setMessages({
        ...messages,
        message: "닉네임이 사용가능하지 않거나 확인되지 않았습니다.",
      });
      return;
    }
    if (phone.trim() !== "") {
      if (phoneCheck !== "available" || phoneRegexCheck !== "available") {
        setMessages({
          ...messages,
          message: "전화번호가 사용가능하지 않거나 확인되지 않았습니다.",
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
          // console.log(res.data);
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
        if (error.response.data.statusCode === 400) {
          setMessages({
            ...messages,
            message: error.response.data.message,
          });
        } else if (error.response.data.statusCode === 401) {
          localStorage.clear();
          props.history.push("/");
        } else {
          // console.log(error.response);
        }
      });
  };

  const onWithdrawl = function () {
    axiosOnWithdrawl(localJWT !== null ? localJWT : "", email)
      .then((res: any) => {
        if (res.data.statusCode === 200) {
          alert("Withdrawl success");
          localStorage.clear();
          props.history.push("/");
        } else {
          // console.log(res.data);
        }
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 400) {
          // console.log(error.response.data);
          setMessages({
            ...messages,
            message: error.response.data.message,
          });
        } else if (error.response.data.statusCode === 401) {
          localStorage.clear();
          props.history.push("/");
        } else {
          // console.log(error.response);
        }
      });
  };

  return (
    <div>
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
            회원 정보
          </Userprofilediv>
          <Formdiv
            style={{
              width: "500px",
              height: "500px",
              justifyContent: "space-evenly",
              boxShadow: "5px 5px 5px 5px grey",
              border: "solid",
              borderWidth: "thin",
              borderRadius: "0.5rem",
            }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                disabled
                label="이메일"
                name="email"
                onChange={onChange}
                value={email}
                required
                style={{ width: "100%" }}
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
                label="닉네임"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%" }}
                helperText={
                  nicknameCheck === "not available"
                    ? "Your nickname isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={
                  nicknameCheck === "available"
                    ? {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "green",
                        color: "#ffffff",
                      }
                    : {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "#404040",
                        color: "#ffffff",
                      }
                }
                onClick={onNicknameCheck}
              >
                중복확인
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
                label="전화번호"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%" }}
                helperText={phoneMessage}
              ></TextField>
              <Button
                variant="contained"
                size="small"
                disabled={phoneRegexCheck === "available" ? false : true}
                style={
                  phoneCheck === "available"
                    ? {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "green",
                        color: "#ffffff",
                      }
                    : {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "#404040",
                        color: "#ffffff",
                      }
                }
                color={phoneCheck === "available" ? "success" : "primary"}
                onClick={onPhoneCheck}
              >
                중복확인
              </Button>
            </div>
          </Formdiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
          <Btn
            style={{ width: "500px", backgroundColor: "#404040" }}
            name="회원정보 변경"
            onClick={onChangeProfile}
          ></Btn>
          <Btn
            style={{
              width: "500px",
              backgroundColor: "#D62B4B",
              marginBottom: "24px",
            }}
            name="회원 탈퇴"
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
          <Userprofilediv>회원 정보</Userprofilediv>
          <Formdiv>
            <div style={{ width: "100%" }}>
              <TextField
                label="이메일"
                name="email"
                onChange={onChange}
                value={email}
                required
                style={{ width: "100%" }}
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
                label="닉네임"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%" }}
                helperText={
                  nicknameCheck === "not available"
                    ? "Your nickname isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={
                  nicknameCheck === "available"
                    ? {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "green",
                        color: "#ffffff",
                      }
                    : {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "#404040",
                        color: "#ffffff",
                      }
                }
                onClick={onNicknameCheck}
              >
                중복확인
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
                label="전화번호"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%" }}
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
                style={
                  phoneCheck === "available"
                    ? {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "green",
                        color: "#ffffff",
                      }
                    : {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "#404040",
                        color: "#ffffff",
                      }
                }
                onClick={onPhoneCheck}
              >
                중복확인
              </Button>
            </div>
          </Formdiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
          <Btn
            style={{ backgroundColor: "#404040" }}
            name="회원정보 변경"
            onClick={onChangeProfile}
          ></Btn>
          <Btn
            style={{ backgroundColor: "#D62B4B" }}
            name="회원 탈퇴"
            onClick={onWithdrawl}
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default UserProfile;
