import React, { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { axiosOnSignIn } from "../../utils/axios";

const SignIn: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const [message, setMessage] = useState({
    message: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignIn = function () {
    axiosOnSignIn(email, password)
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/settingprofile");
        }
      })
      .catch(({ response }) => {});
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
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={onSignIn}>
          SING IN
        </Button>
      </div>
      <Link style={{ color: "inherit", textDecoration: "none" }} to="/signup">
        <Button variant="outlined" color="primary">
          CREATE ACCOUNT
        </Button>
      </Link>
    </div>
  );
};

export default SignIn;
