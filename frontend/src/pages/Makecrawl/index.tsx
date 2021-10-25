import React from "react";
import styled from "styled-components";
import AAtag from "../../components/Atag";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
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

const MakeCrawl = () => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return (
    <div>
      <AppAppBar />
      <Desktop>this page is MakeCrawl page</Desktop>
      <Mobile>this page is MakeCrawl page111</Mobile>
    </div>
  );
};

export default MakeCrawl;
