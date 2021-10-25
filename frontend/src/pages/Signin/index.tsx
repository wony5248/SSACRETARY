<<<<<<< HEAD
import React from "react";
import AAtag from "../../components/Atag";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 613 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 613, maxWidth: 1060 });
  return isTablet ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return isMobile ? children : null;
};

const SignIn = () => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return (
    <div>
      <AppAppBar />
      <Desktop>this page is SignIn page</Desktop>
      <Mobile>this page is SignIn page111</Mobile>
=======
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const SignIn: React.FunctionComponent = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignIn = function () {
    setInputs({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1 className="headline">SIGN IN</h1>
      <div>
        <TextField
          label="Email"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
      </div>
      <div>
        <TextField
          label="Password"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={onSignIn}>
          SING IN
        </Button>
      </div>
      <Link to="/signup">
        <Button variant="outlined" color="primary">
          CREATE ACCOUNT
        </Button>
      </Link>
>>>>>>> d173eae38493e2694a05d487d1c583b4caddb38a
    </div>
  );
};

export default SignIn;
