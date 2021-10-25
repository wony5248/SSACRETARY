import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";

const SignUp: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    phone: "",
  });

  const { email, nickname, password, passwordCheck, phone } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onEmailCheck = () => {};
  const onNicknameCheck = () => {};
  const onPhoneCheck = () => {};
  const onSingUp = ({ history }: RouteComponentProps) => {
    history.push("/settingprofile");
  };
  const onGoBack = () => {};

  return (
    <div>
      <h1 className="headline">SIGN UP</h1>
      <div>
        <TextField
          name="email"
          label="Email"
          required={true}
          onChange={onChange}
        />
        <Button name="email" variant="contained">
          AVAILITY CHECK
        </Button>
      </div>
      <div>
        <TextField
          name="nickname"
          label="Nickname"
          required={true}
          onChange={onChange}
        />
        <Button name="nickname" variant="contained">
          AVAILITY CHECK
        </Button>
      </div>
      <div>
        <TextField
          name="password"
          label="Password"
          required={true}
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          error={password === passwordCheck ? false : true}
          name="passwordCheck"
          label="PasswordCheck"
          required={true}
          onChange={onChange}
          helperText={
            password === passwordCheck
              ? ""
              : "passwordCheck isn't identical to password"
          }
        />
      </div>
      <div>
        <TextField name="phone" label="Phone" onChange={onChange} />
        <Button variant="contained">AVAILITY CHECK</Button>
      </div>
      <div>
        <Button variant="contained">SIGN UP</Button>
      </div>
      <div>
        <Button variant="outlined">GO BACK</Button>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
