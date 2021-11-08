import { Grid } from "@mui/material";
import React from "react";

import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";

import { Userprofilediv1, Carddiv1, Carddiv2 } from "./style";

const data = [
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "이런 결과가 나왔어요",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "아 진짜?",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "어머나",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
  {
    title: "Title",
    url: "URL",
    keyword1: "keyword1",
    keyword2: "keyword2",
    triggerddate: "20211028",
    crawlingsource: "오우쉣",
  },
];
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

const Logprofile = () => {
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
          <Userprofilediv1 style={{fontSize:"24px"}}>Log</Userprofilediv1>
          <Grid container spacing={2} style={{marginTop: "24px"}}>
            {data.map((item) => (
              <Grid item xs={6} style={{paddingTop:"0px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Carddiv1 style={{padding:"16px 0"}}>
                  <Carddiv2>
                    <div style={{fontSize:"24px", fontFamily:"Black Han Sans",fontWeight:600}}>{item.title}</div>
                    <div>{item.url}</div>
                    <div>{item.keyword1}</div>
                    <div>{item.keyword2}</div>
                    <div>{item.triggerddate}</div>
                    <div>{item.crawlingsource}</div>
                  </Carddiv2>
                </Carddiv1>
              </Grid>
            ))}
          </Grid>
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
          <Userprofilediv1>Log</Userprofilediv1>
          {data.map((item) => (
            <Carddiv1>
              <Carddiv2>
                <div>{item.title}</div>
                <div>{item.url}</div>
                <div>{item.keyword1}</div>
                <div>{item.keyword2}</div>
                <div>{item.triggerddate}</div>
                <div>{item.crawlingsource}</div>
              </Carddiv2>
            </Carddiv1>
          ))}
        </div>
      </Mobile>
    </div>
  );
};

export default Logprofile;
