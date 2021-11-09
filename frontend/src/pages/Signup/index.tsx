import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import { HeadlineH1 } from "../../components/Headline/index";
import { CommonDiv } from "../../components/CommonDiv/index";
import { Container } from "../../components/Container/index";
import { makeValidationNumber, sendEmail } from "../../utils/emailValidation";
import {
  axiosOnEmailCheck,
  axiosOnNicknameCheck,
  axiosOnPhoneNumberCheck,
  axiosOnSignUp,
} from "../../utils/axios";
import { onEmailRegexCheck, onPhoneRegexCheck } from "../../utils/regex";

const SignUp: React.FunctionComponent<RouteComponentProps> = (props) => {
  var _ = require("lodash");

  const isMobile = useMediaQuery({ maxWidth: 612 });

  const [inputs, setInputs] = useState({
    email: "",
    emailInputNum: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    phone: "",
  });

  const { email, nickname, password, passwordCheck, phone, emailInputNum } =
    inputs;

  const [checks, setChecks] = useState({
    emailCheck: "default",
    emailRegexCheck: "default",
    emailStep: "default",
    emailValidCheck: "default",
    nicknameCheck: "default",
    phoneCheck: "default",
    phoneRegexCheck: "default",
  });

  const {
    emailCheck,
    emailRegexCheck,
    nicknameCheck,
    phoneCheck,
    phoneRegexCheck,
    emailValidCheck,
    emailStep,
  } = checks;

  const [emailValidNum, setEmailValidNum] = useState("");

  const [messages, setMessages] = useState({
    message: "",
    emailMessage: "",
    phoneMessage: "",
  });

  const { message, emailMessage, phoneMessage } = messages;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "email") {
      if (onEmailRegexCheck(email)) {
        setChecks({
          ...checks,
          emailCheck: "default",
          emailStep: "default",
          emailValidCheck: "default",
          emailRegexCheck: "available",
        });
        setMessages({
          ...messages,
          emailMessage: "",
        });
      } else {
        setChecks({
          ...checks,
          emailCheck: "default",
          emailStep: "default",
          emailValidCheck: "default",
          emailRegexCheck: "not available",
        });
        setMessages({
          ...messages,
          emailMessage: "Email format is wrong",
        });
      }
    } else if (name === "nickname") {
      setChecks({
        ...checks,
        nicknameCheck: "default",
      });
    } else if (name === "phone") {
      if (onPhoneRegexCheck(phone)) {
        setChecks({
          ...checks,
          phoneCheck: "default",
          phoneRegexCheck: "available",
        });
        setMessages({
          ...messages,
          phoneMessage: "",
        });
      } else {
        setChecks({
          ...checks,
          phoneCheck: "default",
          phoneRegexCheck: "not available",
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

  const onEmailCheck = () => {
    if (email.trim() !== "") {
      axiosOnEmailCheck(email)
        .then((res: any) => {
          if (res.status === 200) {
            setChecks({
              ...checks,
              emailCheck: "available",
              emailStep: "waiting",
            });
            let tmpValidationNumber = makeValidationNumber();
            setEmailValidNum(tmpValidationNumber);
            sendEmail(email, tmpValidationNumber);
          } else {
            console.log(res);
          }
        })
        .catch((error: any) => {
          if (error.response.data.statusCode === 400) {
            setChecks({
              ...checks,
              emailCheck: "not available",
            });
          } else {
            console.log(error.response);
          }
        });
    } else {
      alert("Email isn't allowed to be empty");
    }
  };

  const onEmailValidation = function () {
    if (emailValidNum === emailInputNum) {
      setChecks({
        ...checks,
        emailValidCheck: "available",
        emailStep: "done",
      });
      alert("Email validation done");
    } else {
      setChecks({
        ...checks,
        emailValidCheck: "not available",
      });
    }
  };

  const onNicknameCheck = function () {
    if (nickname.trim() !== "") {
      axiosOnNicknameCheck(nickname)
        .then((res: any) => {
          if (res.status === 200) {
            setChecks({
              ...checks,
              nicknameCheck: "available",
            });
          } else {
            console.log(res);
          }
        })
        .catch((error: any) => {
          if (error.response.data.statusCode === 400) {
            setChecks({
              ...checks,
              nicknameCheck: "not available",
            });
          } else {
            console.log(error.response);
          }
        });
    } else {
      alert("Nickname isn't allowed to be empty");
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
          } else {
            console.log(res);
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
          } else {
            console.log(error.response);
          }
        });
    } else {
      alert(
        "Phone isn't required. But if you want to use, then please fill with something in phone"
      );
    }
  };

  const onSignUp = function () {
    if (emailCheck !== "available" || emailRegexCheck !== "available") {
      setMessages({
        ...messages,
        message: "Email check failed",
      });
      return;
    } else if (emailValidCheck !== "available") {
      setMessages({
        ...messages,
        message: "Email validation failed",
      });
      return;
    }
    if (nicknameCheck !== "available") {
      setMessages({
        ...messages,
        message: "Nickname check failed",
      });
      return;
    }
    if (phone.trim() !== "") {
      if (phoneCheck !== "available") {
        setMessages({
          ...messages,
          message: "phone number check failed",
        });
        return;
      }
    }
    axiosOnSignUp(email, nickname, password, passwordCheck, phone)
      .then((res: any) => {
        if (res.status === 200) {
          alert("Your sign up request success");
          props.history.push("/");
        } else {
          console.log(res);
        }
      })
      .catch((error: any) => {
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

  const onGoBack = () => {
    props.history.goBack();
  };

  return (
    <div
      style={
        isMobile
          ? {
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <Container
        style={
          isMobile
            ? {}
            : {
                boxShadow: "5px 5px 5px 5px grey",
                border: "solid",
                borderWidth: "thin",
                borderRadius: "0.5rem",
              }
        }
      >
        <HeadlineH1>SIGN UP</HeadlineH1>
        <CommonDiv>
          <div style={{ display: "flex" }}>
            <TextField
              error={
                emailCheck === "not available" ||
                emailRegexCheck === "not available"
                  ? true
                  : false
              }
              name="email"
              label="Email"
              style={{
                marginRight: "10px",
                width: "200px",
              }}
              required={true}
              onChange={onChange}
              helperText={emailMessage}
            />
            <Button
              disabled={emailRegexCheck === "available" ? false : true}
              style={
                emailCheck === "available"
                  ? {
                      marginLeft: "10px",
                      height: "55px",
                      backgroundColor: "green",
                      color: "#fffff",
                    }
                  : {
                      marginLeft: "10px",
                      height: "55px",
                      backgroundColor: "#404040",
                      color: "#ffffff",
                    }
              }
              variant="contained"
              size="small"
              onClick={onEmailCheck}
            >
              AVAILITY
            </Button>
          </div>
        </CommonDiv>
        {emailStep === "waiting" ? (
          <CommonDiv>
            <div style={{ display: "flex" }}>
              <TextField
                error={emailValidCheck === "not available" ? false : true}
                name="emailInputNum"
                label="Validation Number"
                style={{
                  marginRight: "10px",
                  width: "200px",
                }}
                required={true}
                onChange={onChange}
                helperText={
                  emailValidCheck === "not available"
                    ? ""
                    : "Validation Number is wrong"
                }
              />
              <Button
                style={
                  emailValidCheck === "available"
                    ? {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "green",
                        color: "#fffff",
                      }
                    : {
                        marginLeft: "10px",
                        height: "55px",
                        backgroundColor: "#404040",
                        color: "#fffff",
                      }
                }
                variant="contained"
                size="small"
                onClick={onEmailValidation}
              >
                Valid
              </Button>
            </div>
          </CommonDiv>
        ) : null}
        <CommonDiv>
          <div style={{ display: "flex" }}>
            <TextField
              error={nicknameCheck === "not available" ? true : false}
              name="nickname"
              label="Nickname"
              style={{
                marginRight: "10px",
                width: "200px",
              }}
              required={true}
              onChange={onChange}
              helperText={
                nicknameCheck === "not available"
                  ? "Your nickname isn't available"
                  : ""
              }
            />
            <Button
              name="nickname"
              variant="contained"
              style={
                nicknameCheck === "available"
                  ? {
                      marginLeft: "10px",
                      height: "55px",
                      backgroundColor: "green",
                      color: "#fffff",
                    }
                  : {
                      marginLeft: "10px",
                      height: "55px",
                      backgroundColor: "#404040",
                      color: "#fffff",
                    }
              }
              size="small"
              onClick={onNicknameCheck}
            >
              AVAILITY
            </Button>
          </div>
        </CommonDiv>
        <CommonDiv>
          <TextField
            name="password"
            label="Password"
            style={{
              alignSelf: "start",
              width: "200px",
            }}
            type="password"
            required={true}
            onChange={onChange}
          />
        </CommonDiv>
        <CommonDiv>
          <TextField
            error={password === passwordCheck ? false : true}
            name="passwordCheck"
            label="PasswordCheck"
            type="password"
            required={true}
            style={{
              alignSelf: "start",
              width: "200px",
            }}
            onChange={onChange}
            helperText={
              password === passwordCheck ? "" : "PasswordCheck isn't identical"
            }
          />
        </CommonDiv>
        <CommonDiv>
          <div style={{ display: "flex" }}>
            <TextField
              error={
                phoneCheck === "not available" ||
                phoneRegexCheck === "not available"
                  ? true
                  : false
              }
              name="phone"
              label="Phone"
              style={{
                marginRight: "10px",
                width: "200px",
              }}
              onChange={onChange}
              helperText={phoneMessage}
            />
            <Button
              disabled={phoneRegexCheck === "available" ? false : true}
              variant="contained"
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
              AVAILITY
            </Button>
          </div>
        </CommonDiv>
        <CommonDiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
        </CommonDiv>
        <CommonDiv>
          <Button
            variant="contained"
            style={{ width: "200px" }}
            onClick={onSignUp}
          >
            SIGN UP
          </Button>
          <Button
            variant="outlined"
            style={{ width: "200px" }}
            onClick={onGoBack}
          >
            GO BACK
          </Button>
        </CommonDiv>
      </Container>
    </div>
  );
};

export default withRouter(SignUp);
