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
          if (error.response.data.statusCode === 400) {
            setMessage(error.response.data.message);
          } else {
            // console.log(error.response);
          }
        });
    } else {
      alert("이메일과 비밀번호 모두 필요합니다.");
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
        <img
          style={{ marginTop: "10px" }}
          src={Logo}
          width="200px"
          height="200px"
        ></img>
        <HeadlineH1 style={{ marginTop: "10px" }}>로그인</HeadlineH1>
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
          <div style={{ marginBottom: "10px" }}>
            <Button
              sx={{ width: "200px", backgroundColor: "#404040" }}
              variant="contained"
              onClick={onSignIn}
            >
              로그인
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
                회원가입
              </Button>
            </Link>
          </div>
        </CommonDiv>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
