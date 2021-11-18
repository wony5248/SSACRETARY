import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

import styled from "styled-components";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Menubar from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { deepOrange } from "@mui/material/colors";
import { Typography } from "@mui/material";

import AppBar from "../components/AppBar";
import Toolbar from "../components/ToolBar";

interface ITest {
  open: any;
}

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #404040;
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
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #808080;
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
  color: #ffffff;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${(props: ITest) => (props.open ? "#FFFFFF" : "#EFFFFA")};
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
        크롤링 생성
      </a>
      <a href="/settingprofile">
        <span role="img" aria-label="about us">
          ⚙️
        </span>
        나의 크롤링
      </a>
      <a href="/log">
        <span role="img" aria-label="control">
          📃
        </span>
        크롤링 로그
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const opened = Boolean(anchorEl);
  const history = useHistory();
  const [email, setEmail] :any = React.useState("")
  useEffect(() => {
    setEmail(localStorage.getItem("email")?.toUpperCase())

  }, [])
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = function () {
    localStorage.clear();
    history.push("/");
  };
  // const [islogin, setIslogin] = React.useState(false)
  // const node = React.useRef();
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#404040" }} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ flex: 1 }}
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </Box>
          <Typography sx={{ fontSize: 24 }}>{"SSACRETARY"}</Typography>
          <React.Fragment>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="계정 정보">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>{email[0]}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menubar
              anchorEl={anchorEl}
              open={opened}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => (window.location.href = "/userprofile")}>
                <Avatar />
                회원 정보
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => (window.location.href = "/settingprofile")}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                나의 크롤링
              </MenuItem>

              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Menubar>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
