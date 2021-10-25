import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import { Alert, Button, TextField } from "@mui/material";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { axiosOnSignIn } from "../../utils/axios";
import { HeadlineH1 } from "../../components/Headline/index";
import { CommonDiv } from "../../components/CommonDiv/index";
import { Container } from "../../components/Container/index";

const SignIn: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignIn = async function () {
    await userAPI
      .axiosOnSignIn(email, password)
      .then((res: any) => {
        if (res.data.statusCode == 200) {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("userInfo", res.data.userInfo);
          props.history.push("/settingprofile");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((error: any) => {
        setMessage(error.response.data.error);
      });
  };

  return (
    <Container>
      <img src={Logo} width="200px" height="200px"></img>
      <HeadlineH1>SIGN IN</HeadlineH1>
      <CommonDiv>
        <TextField
          label="Email"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
      </CommonDiv>
      <CommonDiv>
        <TextField
          label="Password"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
      </CommonDiv>
      <CommonDiv>
        {message !== "" ? <Alert severity="error">{message}</Alert> : null}
      </CommonDiv>
      <CommonDiv>
        <div>
          <Button
            style={{ width: "200px" }}
            variant="contained"
            color="primary"
            onClick={onSignIn}
          >
            SING IN
          </Button>
        </div>
        <div>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to="/signup"
          >
            <Button
              style={{ width: "200px" }}
              variant="outlined"
              color="primary"
            >
              CREATE ACCOUNT
            </Button>
          </Link>
        </div>
      </CommonDiv>
    </Container>
  );
};

export default withRouter(SignIn);
