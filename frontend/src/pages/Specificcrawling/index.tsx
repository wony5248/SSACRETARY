import React from "react";
import styled from "styled-components";
import AAtag from "../../components/Atag";
import Box from "@mui/material/Box";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Urldiv, Carddiv, Cardcondiv } from "./style";
import Btn from "../../components/Button";
import { Grid } from "@mui/material";
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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word Count
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
    </CardContent>
    <CardActions></CardActions>
  </React.Fragment>
);

const SettingProfile: React.FunctionComponent = () => {
  const Click = () => {
    console.log("clicked");
  };

  return (
    <div>
      <AppAppBar />
      <Desktop>this page is Specificcrawl page</Desktop>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Urldiv>URL</Urldiv>
          <Carddiv>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">{card}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card}</Card>
              </Grid>
            </Grid>
          </Carddiv>
          <Btn onClick={Click} name="Go to Detail"></Btn>
          <Btn onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
