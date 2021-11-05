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

const Desktop: React.FunctionComponent = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 613 });
  return isDesktop ? children : null;
};

const Mobile: React.FunctionComponent = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return isMobile ? children : null;
};

const SignUp: React.FunctionComponent<RouteComponentProps> = (props) => {
  var _ = require("lodash");
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
    emailStep: "default",
    emailValidCheck: "default",
    nicknameCheck: "default",
    phoneCheck: "default",
  });

  const { emailCheck, nicknameCheck, phoneCheck, emailValidCheck, emailStep } =
    checks;

  const [emailValidNum, setEmailValidNum] = useState("");

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onEmailCheck = () => {
    if (email.trim() !== "") {
      axiosOnEmailCheck(email)
        .then((res: any) => {
          if (res.status === 201) {
            setChecks({
              ...checks,
              emailCheck: "available",
              emailStep: "waiting",
            });
            let tmpValidationNumber = makeValidationNumber();
            setEmailValidNum(tmpValidationNumber);
            sendEmail(email, tmpValidationNumber);
          } else {
            setChecks({
              ...checks,
              emailCheck: "not available",
            });
          }
        })
        .catch((error: any) => {
          alert(error.response.data.error);
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
          if (res.status === 201) {
            setChecks({
              ...checks,
              nicknameCheck: "available",
            });
          } else {
            setChecks({
              ...checks,
              nicknameCheck: "not available",
            });
          }
        })
        .catch((error: any) => {
          alert(error.response.data.error);
        });
    } else {
      alert("Nickname isn't allowed to be empty");
    }
  };

  const onPhoneCheck = function () {
    if (phone.trim() !== "") {
      axiosOnPhoneNumberCheck(phone)
        .then((res: any) => {
          if (res.status === 201) {
            setChecks({
              ...checks,
              phoneCheck: "available",
            });
          } else {
            setChecks({
              ...checks,
              phoneCheck: "not available",
            });
          }
        })
        .catch((error: any) => {
          alert(error.response.data.error);
        });
    } else {
      alert(
        "Phone isn't required. But if you want to use, then please fill with something in phone"
      );
    }
  };

  const onSignUp = function () {
    if (emailCheck !== "available") {
      setMessage("Email check failed");
      return;
    } else if (emailValidCheck !== "available") {
      setMessage("Email validation failed");
      return;
    }
    if (nicknameCheck !== "available") {
      setMessage("Nickname check failed");
      return;
    }
    if (phone.trim() !== "") {
      if (phoneCheck !== "available") {
        setMessage("phone number check failed");
        return;
      }
    }
    axiosOnSignUp(email, nickname, password, passwordCheck, phone)
      .then((res: any) => {
        if (res.status === 201) {
          props.history.push("/");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((error: any) => {
        setMessage(error.response.data.error);
      });
  };

  const onGoBack = () => {
    props.history.goBack();
  };

  return (
    <>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Container>
            <HeadlineH1>SIGN UP</HeadlineH1>
            <CommonDiv>
              <div style={{ display: "flex" }}>
                <TextField
                  type="email"
                  error={emailCheck === "not available" ? true : false}
                  name="email"
                  label="Email"
                  style={{
                    marginRight: "10px",
                    width: "200px",
                  }}
                  required={true}
                  onChange={onChange}
                  helperText={
                    emailCheck === "not available"
                      ? "Your email isn't available"
                      : ""
                  }
                />
                <Button
                  style={{ marginLeft: "10px", height: "55px" }}
                  variant="contained"
                  size="small"
                  color={emailCheck === "available" ? "success" : "primary"}
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
                    style={{ marginLeft: "10px", height: "55px" }}
                    variant="contained"
                    size="small"
                    color={
                      emailValidCheck === "available" ? "success" : "primary"
                    }
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
                  style={{ marginLeft: "10px", height: "55px" }}
                  size="small"
                  color={nicknameCheck === "available" ? "success" : "primary"}
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
                  password === passwordCheck
                    ? ""
                    : "PasswordCheck isn't identical"
                }
              />
            </CommonDiv>
            <CommonDiv>
              <div style={{ display: "flex" }}>
                <TextField
                  error={phoneCheck === "not available" ? true : false}
                  name="phone"
                  label="Phone"
                  style={{
                    marginRight: "10px",
                    width: "200px",
                  }}
                  onChange={onChange}
                  helperText={
                    phoneCheck === "not available"
                      ? "Your phone number isn't available"
                      : ""
                  }
                />
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: "10px", height: "55px" }}
                  color={phoneCheck === "available" ? "success" : "primary"}
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
      </Mobile>
      <Desktop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Container>
            <HeadlineH1>SIGN UP</HeadlineH1>
            <CommonDiv>
              <div style={{ display: "flex" }}>
                <TextField
                  error={emailCheck === "not available" ? true : false}
                  name="email"
                  label="Email"
                  style={{
                    marginRight: "10px",
                    width: "200px",
                  }}
                  required={true}
                  onChange={onChange}
                  helperText={
                    emailCheck === "not available"
                      ? "Your email isn't available"
                      : ""
                  }
                />
                <Button
                  style={{ marginLeft: "10px", height: "55px" }}
                  variant="contained"
                  size="small"
                  color={emailCheck === "available" ? "success" : "primary"}
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
                    style={{ marginLeft: "10px", height: "55px" }}
                    variant="contained"
                    size="small"
                    color={
                      emailValidCheck === "available" ? "success" : "primary"
                    }
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
                  style={{ marginLeft: "10px", height: "55px" }}
                  size="small"
                  color={nicknameCheck === "available" ? "success" : "primary"}
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
                  password === passwordCheck
                    ? ""
                    : "PasswordCheck isn't identical"
                }
              />
            </CommonDiv>
            <CommonDiv>
              <div style={{ display: "flex" }}>
                <TextField
                  error={phoneCheck === "not available" ? true : false}
                  name="phone"
                  label="Phone"
                  style={{
                    marginRight: "10px",
                    width: "200px",
                  }}
                  onChange={onChange}
                  helperText={
                    phoneCheck === "not available"
                      ? "Your phone number isn't available"
                      : ""
                  }
                />
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: "10px", height: "55px" }}
                  color={phoneCheck === "available" ? "success" : "primary"}
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
      </Desktop>
    </>
  );
};

export default withRouter(SignUp);
