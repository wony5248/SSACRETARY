import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/ToolBar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import Menubar from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { deepOrange } from "@mui/material/colors";
interface ITest {
  open: any;
}

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
      <a href="/log">
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("open");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [islogin, setIslogin] = React.useState(false)
  // const node = React.useRef();
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
          <React.Fragment>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
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
              <MenuItem onClick ={() => window.location.href="/userprofile"}>
                <Avatar />User Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick ={() => window.location.href="/settingprofile"}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                My Settings
              </MenuItem>
              
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
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
