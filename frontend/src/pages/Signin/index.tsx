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
    </div>
  );
};

export default SignIn;
