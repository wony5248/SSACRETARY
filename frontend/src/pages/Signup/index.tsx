import React from "react";
import styled from "styled-components";
import AAtag from "../../components/Atag";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import { Headerdiv, Bodydiv, Settingdiv } from "../Settingprofile/style";
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
const SignUp = () => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return (
    <div>
      <AppAppBar />
      <Desktop>this page is SignUp page</Desktop>
      <Mobile>
        <div>
            <Headerdiv>Crawlings</Headerdiv>
            <Bodydiv>
                <Settingdiv></Settingdiv>
                <Settingdiv></Settingdiv>
                <Settingdiv></Settingdiv>
                <Settingdiv></Settingdiv>
                <Settingdiv></Settingdiv>
            </Bodydiv>
            </div>this page is SignUp page111
      </Mobile>
    </div>
  );
};

export default SignUp;
