import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TextField, Button, Alert } from "@mui/material";

import AppAppBar from "../../views/AppAppBar";
import Btn from "../../components/Button";
import { Userprofilediv, Formdiv } from "./style";
import { Styledbtn } from "./style";
import {
  axiosOnNicknameCheck,
  axiosOnPhoneNumberCheck,
} from "../../utils/axios";

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
const UserProfile = () => {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    phone: "",
  });

  const { email, nickname, phone } = inputs;

  const [checks, setChecks] = useState({
    nicknameCheck: "dafualt",
    phoneCheck: "default",
  });

  const { nicknameCheck, phoneCheck } = checks;

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onNicknameCheck = function () {
    if (nickname.trim() !== "") {
      axiosOnNicknameCheck(nickname)
        .then((res: any) => {
          if (res.status === 201) {
            setChecks({
              ...checks,
              ["nicknameCheck"]: "available",
            });
          } else {
            setChecks({
              ...checks,
              ["nicknameCheck"]: "not available",
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      alert("nickname isn't allowed to be empty");
    }
  };

  const onPhoneCheck = function () {
    if (phone.trim() !== "") {
      axiosOnPhoneNumberCheck(phone)
        .then((res: any) => {
          if (res.status === 201) {
            setChecks({
              ...checks,
              ["phoneCheck"]: "available",
            });
            console.log(phoneCheck);
          } else {
            setChecks({
              ...checks,
              ["phoneCheck"]: "not available",
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      alert(
        "Phone isn't required. But if you want to use, then please fill with something in phone"
      );
    }
  };

  const onChangeProfile = function () {
    if (nicknameCheck !== "available") {
      setMessage("Nickname check failed");
      return;
    }
    if (phone.trim() !== "") {
      if (phoneCheck !== "available") {
        setMessage("phone number check failed");
        return;
      }
    }
  };

  const onWithdrawl = function () {};
  //   const isMobile = useMediaQuery({ maxWidth: 612 });
  return (
    <div>
      {/* {isMobile ? <AppAppBar /> : undefined} */}
      <AppAppBar />
      <Desktop>this page is UserProfile page</Desktop>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv>Profile</Userprofilediv>
          <Formdiv>
            <div style={{ width: "100%" }}>
              <TextField
                label="Email"
                name="email"
                onChange={onChange}
                value={email}
                required
                style={{ width: "100%", backgroundColor: "#E6E6E6" }}
              ></TextField>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={nicknameCheck === "not available" ? true : false}
                label="Nickname"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={
                  nicknameCheck === "not available"
                    ? "Your nickname isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: "10px", height: "55px" }}
                color={nicknameCheck === "available" ? "success" : "primary"}
                onClick={onNicknameCheck}
              >
                AVAILITY
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={phoneCheck === "not available" ? true : false}
                label="Phone"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%", backgroundColor: "#E6E6E6" }}
                helperText={
                  phoneCheck === "not available"
                    ? "Your phone number isn't available"
                    : ""
                }
              ></TextField>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: "10px", height: "55px" }}
                color={phoneCheck === "available" ? "success" : "primary"}
                onClick={onPhoneCheck}
              >
                AVAILITY
              </Button>
            </div>
          </Formdiv>
          {message.trim() !== "" ? (
            <Alert severity="error">{message}</Alert>
          ) : null}
          <Btn name="CHANGE PROFILE" onClick={onChangeProfile}></Btn>
          <Styledbtn>WITHDRAWL</Styledbtn>
        </div>
      </Mobile>
    </div>
  );
};

export default UserProfile;
