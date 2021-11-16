import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { crawlAPI } from "../../utils/axios";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";

import { Userprofilediv1, Carddiv1, Carddiv2 } from "./style";

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
  const [data, setData]: any[] = useState([]);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");

    const getCrawl = async () => {
      await crawlAPI
        .getAllLog(jwt)
        .then(({ data }: any) => {
          console.log(data.allLogsData);
          setData(data.allLogsData);
        })
        .catch((e) => console.log(e));
    };

    getCrawl();
  }, []);
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
          <Userprofilediv1 style={{ fontSize: "24px" }}>크롤링 로그</Userprofilediv1>

            {data.length ? (
              <Grid
                container
                spacing={2}
                style={{ marginTop: "24px", maxWidth: "1050px" }}
              >
                {data.map((item: any) => (
                  <Grid
                    item
                    xs={6}
                    style={{
                      paddingTop: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Carddiv1 style={{ padding: "16px 0" }}>
                      <Carddiv2>
                        <div
                          style={{
                            fontSize: "24px",
                            fontFamily: "Black Han Sans",
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </div>
                        <div>{item.url}</div>
                        <div>{item.keyword1}</div>
                        <div>{item.keyword2}</div>
                        <div>{item.triggerddate}</div>
                        <div>{item.htmlSource}</div>
                      </Carddiv2>
                    </Carddiv1>
                  </Grid>
                ))}
              </Grid>
            ) : null}
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
          <Userprofilediv1>크롤링 로그</Userprofilediv1>
          {data.length ? (
              <Grid
                container
                spacing={2}
                style={{ marginTop: "24px", maxWidth: "1050px" }}
              >
                {data.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    style={{
                      paddingTop: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Carddiv1 style={{ padding: "16px 0" }}>
                      <Carddiv2>
                        <div
                          style={{
                            fontSize: "24px",
                            fontFamily: "Black Han Sans",
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </div>
                        <div>{item.url}</div>
                        <div>{item.keyword1}</div>
                        <div>{item.keyword2}</div>
                        <div>{item.triggerddate}</div>
                        <div>{item.htmlSource}</div>
                      </Carddiv2>
                    </Carddiv1>
                  </Grid>
                ))}
              </Grid>
            ) : null}
        </div>
      </Mobile>
    </div>
  );
};

export default Logprofile;
