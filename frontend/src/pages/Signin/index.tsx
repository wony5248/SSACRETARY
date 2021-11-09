import React, { useState, useEffect } from "react";

import { Alert, Button, TextField } from "@mui/material";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Logo from "../../assets/logo.png";
import { axiosOnSignIn } from "../../utils/axios";
import { HeadlineH1 } from "../../components/Headline/index";
import { CommonDiv } from "../../components/CommonDiv/index";
import { Container } from "../../components/Container/index";

const SignIn: React.FunctionComponent<RouteComponentProps> = (props) => {
  useEffect(() => {
    const isLogin = localStorage.getItem("jwt") !== null ? true : false;
    if (isLogin) {
      props.history.push("/settingprofile");
    }
  });

  const isMobile = useMediaQuery({ maxWidth: 612 });

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
    if (email.trim() !== "" && password.trim() !== "") {
      axiosOnSignIn(email, password)
        .then((res: any) => {
          if (res.data.statusCode === 200) {
            localStorage.setItem("jwt", res.data.jwt);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("nickname", res.data.nickname);
            localStorage.setItem("phone", res.data.phoneNum);
            props.history.push("/settingprofile");
          } else {
            setMessage(res.data.message);
          }
        })
        .catch((error: any) => {
          setMessage(error.response);
        });
    } else {
      alert("Email and password both required");
    }
  };

  const onKeyPress = function (event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      onSignIn();
    }
  };

  return (
    <div
      style={
        isMobile
          ? { height: "100vh", display: "flex", justifyContent: "center", alignItems:"center" }
          : { height: "100vh", display: "flex", justifyContent: "center", alignItems:"center" }
      }
    >
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
            type="password"
            onChange={onChange}
            onKeyPress={onKeyPress}
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
              SIGN IN
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
    </div>
  );
};

export default withRouter(SignIn);
