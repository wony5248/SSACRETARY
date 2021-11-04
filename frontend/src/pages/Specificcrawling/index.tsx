import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
const dodata = {
  labels: ["My Keyword", "Not My Keyword"],
  datasets: [
    {
      data: [66, 34],
      backgroundColor: ["rgba(255,99,132,0.6)", "#D8D8D8"],
      hoverBackgroundColor: ["rgba(255,99,132,1)", "#D8D8D8"],
    },
  ],
};
const data = {
  labels: ["20211031", "20211101", "20211102", "20211103", "20211104"],
  datasets: [
    {
      label: "Word Count",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
const linedata = {
  labels: ["old", "●", "●", "●", "●", "recent"],
  datasets: [
    {
      label: "My Keyword",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};
const card1 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Crawl Count
        {/* 최근 몇일간 크롤링 실행 횟수-> 알람 횟수? */}
      </Typography>
      <div>
        <Bar
          data={data}
          width={100}
          height={170}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </CardContent>
  </React.Fragment>
);
const card2 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Word Percentage
      </Typography>
      <div>
        <Doughnut
          data={dodata}
          height={170}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </CardContent>
  </React.Fragment>
);
const card3 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Word Count
      </Typography>
      <div>
        <Line
          data={linedata}
          height={170}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </CardContent>
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
          <Urldiv style={{ fontSize: "24px" }}>URL</Urldiv>
          <Carddiv style={{ height: "900px" }}>
            <Grid style={{ height: "100%" }} container spacing={2}>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card
                  title="최근 몇일간 크롤링 실행 횟수"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  variant="outlined"
                >
                  {card1}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card
                  title="최근 크롤링에서 내가 설정한 키워드 비율"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  variant="outlined"
                >
                  {card2}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={12}>
                <Card
                  title="최근 몇개의 크롤링에서 키워드 갯수(오른쪽이 최신)"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  variant="outlined"
                >
                  {card3}
                </Card>
              </Grid>
            </Grid>
          </Carddiv>
          <Btn
            style={{ width: "90%" }}
            onClick={Click}
            name="Go to Detail"
          ></Btn>
          <Btn style={{ width: "90%" }} onClick={Click} name="Make Crawl"></Btn>
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
          <Carddiv style={{ height: "550px" }}>
            <Grid style={{ height: "100%" }} container spacing={2}>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card style={{ height: "100%" }} variant="outlined">
                  {card1}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card style={{ height: "100%" }} variant="outlined">
                  {card2}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={12}>
                <Card style={{ height: "100%" }} variant="outlined">
                  {card3}
                </Card>
              </Grid>
            </Grid>
          </Carddiv>
          <Btn
            style={{ marginTop: "0px" }}
            onClick={Click}
            name="Go to Detail"
          ></Btn>
          <Btn style={{marginBottom:"24px"}} onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
