import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (event: any) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignIn = function () {};
  const onSignUp = function () {};
  return (
    <div>
      <h1 className="headline">SIGN IN</h1>
      <div>
        <TextField label="Email" />
      </div>
      <div>
        <TextField label="Password" />
      </div>
      <div>
        <Button variant="contained" color="primary">
          SING IN
        </Button>
      </div>
      <div>
        <Button variant="outlined" color="primary">
          CREATE ACCOUNT
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
