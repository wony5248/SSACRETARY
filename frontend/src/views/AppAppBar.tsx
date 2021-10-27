import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/ToolBar";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { display } from "@mui/system";
import { deepOrange, deepPurple } from '@mui/material/colors';
interface ITest {
  open: any;
}


const rightLink = {
  fontSize: 16,
  color: "main.white",
  ml: 3,
};
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:flex-start;
  background: #e6f5ff;
  transform: ${(props: ITest) =>
    props.open ? "translateX(0)" : "translateX(-100%)"};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;
const StyledBurger = styled.button`
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${(props: ITest) => (props.open ? "#0D0C1D" : "#EFFFFA")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${(props: ITest) =>
        props.open ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${(props: ITest) => (props.open ? "0" : "1")};
      transform: ${(props: ITest) =>
        props.open ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${(props: ITest) =>
        props.open ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;
const Menu = (props: any) => {
  const { open } = props;
  return (
    <StyledMenu open={open}>
      <a href="/makecrawl">
        <span role="img" aria-label="control">
        🔨
        </span>
        Make Crawl
      </a>
      <a href="/changecrawl">
        <span role="img" aria-label="about us">
        🔧
        </span>
        Change Crawl
      </a>
      <a href="/settingprofile">
        <span role="img" aria-label="about us">
        ⚙️
        </span>
        Setting Crawl
      </a>
      <a href="/specificcrawling">
        <span role="img" aria-label="control">
        📌
        </span>
        Specific Crawl
      </a>
      <a href="/userprofile">
        <span role="img" aria-label="control">
        🙎‍♂️
        </span>
        UserProfile
      </a>
      <a href="/makecrawl">
        <span role="img" aria-label="control">
        🔨
        </span>
        Crawl Log
      </a>
    </StyledMenu>
  );
};
const Burger = (props: any) => {
  const { open, setOpen } = props;
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [islogin, setIslogin] = React.useState(false)
  const node = React.useRef();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ flex: 1 }}
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {"SSACRETARY"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Avatar sx={{bgcolor:deepOrange[500]}}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
