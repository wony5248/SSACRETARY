import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import { Userprofilediv, Formdiv, Checkbtn } from "./style";
import TextField from "@mui/material/TextField";
import Btn from"../../components/Button"
import { Styledbtn } from "./style";
const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 613 });
  return isDesktop ? children : null;
};
// const Tablet = ({ children }: any) => {
//   const isTablet = useMediaQuery({ minWidth: 613, maxWidth: 1060 });
//   return isTablet ? children : null;
// };
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
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };


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
                style={{ width: "100%", backgroundColor:"#E6E6E6" }}
              ></TextField>
            </div>
            <div style={{ width: "100%", marginTop: "24px", display:"flex", justifyContent:"space-between" }}>
              <TextField
                label="Nickname"
                name="nickname"
                onChange={onChange}
                value={nickname}
                required
                style={{ width: "70%", backgroundColor:"#E6E6E6" }}
              ></TextField>
              <Checkbtn>CHECK</Checkbtn>
            </div>
            <div style={{ width: "100%", marginTop: "24px", display:"flex", justifyContent:"space-between" }}>
            <TextField
                label="Phone"
                name="phone"
                onChange={onChange}
                value={phone}
                required
                style={{ width: "70%", backgroundColor:"#E6E6E6" }}
              ></TextField>
              <Checkbtn>CHECK</Checkbtn>
            </div>
          </Formdiv>
          <Btn name = "CHANGE PROFILE"></Btn>
          <Styledbtn>WITHDRAWL</Styledbtn>
        </div>
      </Mobile>
    </div>
  );
};

export default UserProfile;
