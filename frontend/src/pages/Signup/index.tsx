import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { HeadlineH1 } from "../../components/Headline/index";
import { CommonDiv } from "../../components/CommonDiv/index";
import { Container } from "../../components/Container/index";
import {
  axiosOnEmailCheck,
  axiosOnNicknameCheck,
  axiosOnPhoneNumberCheck,
} from "../../utils/axios";

const SignUp: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    phone: "",
  });

  const { email, nickname, password, passwordCheck, phone } = inputs;

  const [checks, setChecks] = useState({
    emailCheck: "default",
    nicknameCheck: "default",
    phoneCheck: "default",
  });

  const { emailCheck, nicknameCheck, phoneCheck } = checks;

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
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onNicknameCheck = () => {};

  const onPhoneCheck = () => {};

  const onSingUp = () => {
    props.history.push("/settingprofile");
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
            name="email"
            label="Email"
            style={{ marginRight: "10px", width: "200px" }}
            required={true}
            onChange={onChange}
          />
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            size="small"
            color={emailCheck === "available" ? "success" : "primary"}
            onClick={onEmailCheck}
          >
            AVAILITY
          </Button>
        </div>
      </CommonDiv>
      <CommonDiv>
        <div style={{ display: "flex" }}>
          <TextField
            name="nickname"
            label="Nickname"
            style={{ marginRight: "10px", width: "200px" }}
            required={true}
            onChange={onChange}
          />
          <Button
            name="nickname"
            variant="contained"
            style={{ marginLeft: "10px" }}
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
            name="phone"
            label="Phone"
            style={{ marginRight: "10px", width: "200px" }}
            onChange={onChange}
          />
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: "10px" }}
            color={phoneCheck === "available" ? "success" : "primary"}
            onClick={onPhoneCheck}
          >
            AVAILITY
          </Button>
        </div>
      </CommonDiv>
      <div style={{ marginTop: "40px" }}>
        <CommonDiv>
          <Button variant="contained" style={{ width: "200px" }}>
            SIGN UP
          </Button>
          <Button variant="outlined" style={{ width: "200px" }}>
            GO BACK
          </Button>
        </CommonDiv>
      </div>
    </Container>
  );
};

export default withRouter(SignUp);
