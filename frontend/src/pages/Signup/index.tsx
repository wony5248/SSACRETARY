import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";

const SignUp = () => {
  return (
    <div>
      <h1 className="headline">SIGN UP</h1>
      <div>
        <TextField name="email" label="Email" required={true} />
        <Button name="email" variant="contained">
          CHECK
        </Button>
      </div>
      <div>
        <TextField name="nickname" label="Nickname" required={true} />
        <Button name="nickname" variant="contained">
          CHECK
        </Button>
      </div>
      <div>
        <TextField name="passwordCheck" label="Password" required={true} />
      </div>
      <div>
        <TextField name="passwordCheck" label="PasswordCheck" required={true} />
      </div>
      <div>
        <TextField name="phone" label="Phone" />
        <Button name="phone" variant="contained">
          CHECK
        </Button>
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

export default SignUp;
