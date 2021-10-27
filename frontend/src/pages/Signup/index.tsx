import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { HeadlineH1 } from "../../components/Headline/index";
import { CommonDiv } from "../../components/CommonDiv/index";
import { Container } from "../../components/Container/index";
import {
  axiosOnEmailCheck,
  axiosOnNicknameCheck,
  axiosOnPhoneNumberCheck,
  axiosOnSignUp,
} from "../../utils/axios";

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
    emailValidCheck: "default",
    nicknameCheck: "default",
    phoneCheck: "default",
  });

  const { emailCheck, nicknameCheck, phoneCheck, emailValidCheck } = checks;

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
    axiosOnEmailCheck(email)
      .then((res: any) => {
        if (res.status === 201) {
          setChecks({
            ...checks,
            ["emailCheck"]: "available",
          });
        } else {
          setChecks({
            ...checks,
            ["emailCheck"]: "not Available",
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onNicknameCheck = () => {
    axiosOnNicknameCheck(nickname)
      .then((res: any) => {
        if (res.status === 201) {
          setChecks({
            ...checks,
            ["nicknameCheck"]: "available",
          });
        } else {
          setChecks({
            ...checks,
            ["nicknameCheck"]: "not Available",
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onPhoneCheck = () => {
    axiosOnPhoneNumberCheck(phone)
      .then((res: any) => {
        if (res.status === 201) {
          setChecks({
            ...checks,
            ["phoneCheck"]: "available",
          });
        } else {
          setChecks({
            ...checks,
            ["phoneCheck"]: "not Available",
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onSignUp = () => {
    if (emailCheck !== "available") {
      setMessage("Email check failed");
      return;
    } else if (emailValidCheck !== "valid") {
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
        if (res.status === 200) {
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
    <Container>
      <HeadlineH1>SIGN UP</HeadlineH1>
      <CommonDiv>
        <div style={{ display: "flex" }}>
          <TextField
            error={emailCheck === "not available" ? true : false}
            name="email"
            label="Email"
            style={{ marginRight: "10px", width: "200px" }}
            required={true}
            onChange={onChange}
            helperText={
              emailCheck === "not available" ? "Your email isn't available" : ""
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
      {emailValidCheck === "waiting" ? (
        <div>
          <TextField
            name="emailInputNum"
            label="Validation Number"
            style={{ marginRight: "10px", width: "200px" }}
            required={true}
            onChange={onChange}
          />
          <Button style={{ marginLeft: "10px" }}>Valid</Button>
        </div>
      ) : null}
      <CommonDiv>
        <div style={{ display: "flex" }}>
          <TextField
            error={emailCheck === "not available" ? true : false}
            name="nickname"
            label="Nickname"
            style={{ marginRight: "10px", width: "200px" }}
            required={true}
            onChange={onChange}
            helperText={
              emailCheck === "not available"
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
          style={{ alignSelf: "start", width: "200px" }}
          required={true}
          onChange={onChange}
        />
      </CommonDiv>
      <CommonDiv>
        <TextField
          error={password === passwordCheck ? false : true}
          name="passwordCheck"
          label="PasswordCheck"
          required={true}
          style={{ alignSelf: "start", width: "200px" }}
          onChange={onChange}
          helperText={
            password === passwordCheck
              ? ""
              : "passwordCheck isn't identical to password"
          }
        />
      </CommonDiv>
      <CommonDiv>
        <div style={{ display: "flex" }}>
          <TextField
            error={emailCheck === "not available" ? true : false}
            name="phone"
            label="Phone"
            style={{ marginRight: "10px", width: "200px" }}
            onChange={onChange}
            helperText={
              emailCheck === "not available"
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
  );
};

export default withRouter(SignUp);
