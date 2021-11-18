import React, { useRef, useEffect, useState } from "react";
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
import { crawlAPI } from "../../utils/axios";
import moment from "moment";
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

const SettingProfile: React.FunctionComponent = ({ match }: any) => {
  const [keywords, setKeywords] = useState([]);
  const [count, setCount] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [date, setDate] = useState([]);
  const [total, setTotal] = useState([]);
  const [latestdata, setLatestData] : any = useState({});
  useEffect(() => {
    const getData = async () => {
      await crawlAPI
        .getSettingDetail(jwt, id)
        .then(({ data }: any) => {
          console.log(data.logs[data.logs.length-1]);
          setLatestData(data.logs[data.logs.length-1])
          let arr: any = [];
          let arr2: any = [];
          let arr3: any = [];
          let arr4: any = [];
          for (let i = 0; i < data.logs[data.logs.length-1].keywordCount.length; i++) {
            arr.push(Object.values(data.logs[data.logs.length-1].keywordCount[i])[0]);
          }
          for (let j = 0; j < data.logs.length; j++) {
            let cnt = 0;
            if (j < 6) {
              for (let i = 0; i < data.logs[j].keywordCount.length; i++) {
                // arr.push(Object.values(data.logs[j].keywordCount[i])[0]);
                cnt += Number(Object.values(data.logs[j].keywordCount[i])[0]);
              }
              arr4.push(cnt);
            }
          }
          data.logs.map((item: any) => {
            if (arr2.length < 5) {
              arr2.push(item.matchSentences.length);
              arr3.push(moment(item.date).format("YYYYMMDD HH:mm"));
            }
          });
          // console.log(arr);
          setCount(arr);
          setSentence(arr2);
          setDate(arr3);
          setTotal(arr4);
          setKeywords(data.keywords);
          // });
        })
        .catch((e) => console.log(e));
    };

    getData();
  }, []);
  const dodata = {
    labels: keywords,
    datasets: [
      {
        data: count,
        backgroundColor: [
          "#61affe",
          "#49cc90",
          "#fca130",
          "#f93e3e",
          "#d1ce3e",
        ],
        hoverBackgroundColor: [
          "#D8D8D8",
          "#D8D8D8",
          "#D8D8D8",
          "#D8D8D8",
          "#D8D8D8",
        ],
      },
    ],
  };
  const data = {
    labels: date,
    datasets: [
      {
        label: "Sentence Count",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: sentence,
      },
    ],
  };
  const linedata = {
    labels: date,
    datasets: [
      {
        label: "My Keyword",
        data: total,
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
          최근 5개 크롤링의 키워드 포함 문장 갯수
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
          최근 크롤링의 키워드별 검색 횟수
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
          최근 5개 크롤링의 키워드 검색 수
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
  const { id } = match.params;
  const jwt: any = localStorage.getItem("jwt");

  // console.log(id);
  const Click = () => {
    window.location.href = `/changecrawl/${id}`;
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
          <Urldiv style={{ fontSize: "24px" }}>{latestdata.name}</Urldiv>
          <Urldiv style={{ fontSize: "24px" }}>{latestdata.url}</Urldiv>
          <Carddiv style={{ height: "900px", maxWidth: "1200px" }}>
            <Grid style={{ height: "100%" }} container spacing={2}>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card
                  title="최근 5개 크롤링의 키워드 포함 문장 갯수"
                  style={{
                    height: "100%",
                    display: "flex",
                    boxShadow: "5px 5px 5px 5px grey",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 12px",
                  }}
                  variant="outlined"
                >
                  {card1}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={6}>
                <Card
                  title="최근 크롤링의 키워드별 검색 횟수"
                  sx={{
                    height: "100%",
                    display: "flex",
                    boxShadow: "5px 5px 5px 5px grey",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 12px",
                  }}
                  variant="outlined"
                >
                  {card2}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={12}>
                <Card
                  title="최근 5개의 크롤링 키워드 검색 수"
                  style={{
                    height: "100%",
                    display: "flex",
                    boxShadow: "5px 5px 5px 5px grey",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 12px",
                  }}
                  variant="outlined"
                >
                  {card3}
                </Card>
              </Grid>
            </Grid>
          </Carddiv>
          <Urldiv style={{ fontSize: "24px", marginTop:"0px" }}>최근 크롤링 매칭된 문장</Urldiv>
          <Card
            title="최근 크롤링 매칭된 문장"
            style={{
              height: "500px",
              width: "80%",
              padding: "0 1%",
              boxShadow: "5px 5px 5px 5px grey",
              flexDirection: "column",
              margin: "0 12px",
              overflow:"auto",
            }}
            variant="outlined"
          >
            {latestdata.matchSentences}
          </Card>
          <Btn
            style={{ width: "90%", maxWidth: "1200px" }}
            onClick={Click}
            name="크롤링 변경"
          ></Btn>
          <Btn
            style={{ width: "90%", maxWidth: "1200px", marginBottom: "24px" }}
            onClick={() => {
              window.location.href = "/makecrawl";
            }}
            name="크롤링 생성"
          ></Btn>
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
              <Grid style={{ height: "45%" }} item xs={12}>
                <Card
                  style={{
                    height: "100%",
                    boxShadow: "0px 5px 5px 2px grey",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontSize: "8px",
                  }}
                  variant="outlined"
                >
                  {card1}
                </Card>
              </Grid>
              <Grid style={{ height: "45%" }} item xs={12}>
                <Card
                  style={{
                    height: "100%",
                    boxShadow: "0px 5px 5px 2px grey",
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
                  style={{
                    height: "100%",
                    boxShadow: "0px 5px 5px 2px grey",
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
            style={{ marginTop: "0px" }}
            onClick={Click}
            name="크롤링 변경"
          ></Btn>
          <Btn
            style={{ marginBottom: "24px" }}
            onClick={() => {
              window.location.href = "/makecrawl";
            }}
            name="크롤링 생성"
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
