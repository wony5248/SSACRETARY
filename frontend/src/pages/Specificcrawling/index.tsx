import React, { Component } from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "react-mui-charts/dist/index.css";
import Typography from "@mui/material/Typography";
import { Urldiv, Carddiv } from "./style";
import Btn from "../../components/Button";
import { Grid } from "@mui/material";
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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card1 = (
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
const card2 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word Percentage
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
const card3 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word Cycle
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
const card4 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word Date
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
      <Desktop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Urldiv style={{fontSize:"24px"}}>URL</Urldiv>
          <Carddiv style={{height:"900px"}}>
            <Grid style={{height:"100%"}} container spacing={2}>
              <Grid style={{height:"45%"}} item xs={6}>
                <Card style={{height:"100%"}} variant="outlined">{card1}</Card>
              </Grid>
              <Grid style={{height:"45%"}} item xs={6}>
                <Card style={{height:"100%"}} variant="outlined">{card2}</Card>
              </Grid>
              <Grid style={{height:"45%"}} item xs={6}>
                <Card style={{height:"100%"}} variant="outlined">{card3}</Card>
              </Grid>
              <Grid style={{height:"45%"}} item xs={6}>
                <Card style={{height:"100%"}} variant="outlined">{card4}</Card>
              </Grid>
            </Grid>
          </Carddiv>
          <Btn style={{width:"90%"}} onClick={Click} name="Go to Detail"></Btn>
          <Btn style={{width:"90%"}} onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Desktop>
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
                <Card variant="outlined">{card1}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card2}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card3}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card4}</Card>
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
