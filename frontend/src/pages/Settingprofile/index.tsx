import React from "react";
import styled from "styled-components";
import AAtag from "../../components/Atag";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import {
  Headerdiv,
  Bodydiv,
  Settingdiv,
  Settingtitlediv,
  Settingtagdiv,
  Settingtag
} from "./style";
import Btn from "../../components/Button";
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

const SettingProfile = () => {
  const Click = () => {
    console.log("clicked");
  };
  return (
    <div>
      <AppAppBar />
      <Desktop>this page is SettingProfile page</Desktop>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headerdiv>Crawlings</Headerdiv>
          <Bodydiv>
            <Settingdiv>
              <Settingtitlediv>Title1</Settingtitlediv>
              <Settingtagdiv><Settingtag>tag1</Settingtag></Settingtagdiv>
            </Settingdiv>
            <Settingdiv></Settingdiv>
            <Settingdiv></Settingdiv>
            <Settingdiv></Settingdiv>
            <Settingdiv></Settingdiv>
            <Settingdiv></Settingdiv>
            <Settingdiv></Settingdiv>
          </Bodydiv>
          <Btn onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
