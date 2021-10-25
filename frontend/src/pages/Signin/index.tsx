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

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignIn = function () {
    axiosOnSignIn(email, password)
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
        {message !== "" ? <Alert severity="error">{message}</Alert> : null}
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

export default withRouter(SignIn);
