import React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import {
  Headerdiv,
  Bodydiv,
  Settingdiv,
  Settingtitlediv,
  Settingtagdiv,
  Settingtag,
} from "./style";
import Btn from "../../components/Button";
import { crawlAPI } from "../../utils/axios";
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

const SettingProfile: React.FunctionComponent = () => {
  const [data, setData]:any = useState([]);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    const getCrawl = async () => {
      await crawlAPI
        .getAllSettings(jwt)
        .then(({ data }: any) => {
          if (data.statusCode == 401)
          {
            localStorage.clear()
            window.location.href="/"
          };
          setData(data.allSettingData);
        })
        .catch((e) => console.log(e));
    };

    getCrawl();
  }, []);
  const Click = () => {
    window.location.href = "/makecrawl";
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
          <Headerdiv style={{ fontSize: "24px" }}>나의 크롤링</Headerdiv>
          {data.length ? (
            <Bodydiv
              style={{
                height: "1000px",
                maxWidth: "1000px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "5px 5px 5px 5px grey",
              }}
            >
              {data.map((item: any, index:any) => (
                <Settingdiv
                  onClick={() =>
                    (window.location.href = `/specificcrawling/${item.settingId}`)
                  }
                  style={{ width: "60%", height:"102px" }}
                  key={index}
                >
                  <Settingtitlediv>{item.name}</Settingtitlediv>
                  <Settingtitlediv>{item.url}</Settingtitlediv>
                  <Settingtagdiv>
                    {item.keywords.map((items: any) => (
                      <Settingtag>#️{items}</Settingtag>
                    ))}
                  </Settingtagdiv>
                </Settingdiv>
              ))}
            </Bodydiv>
          ) : (
            <Bodydiv
              style={{
                fontSize: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              등록된 크롤링이 없습니다.
            </Bodydiv>
          )}
          <Btn
            style={{
              marginBottom: "48px",
              marginTop: "48px",
              width: "90%",
              maxWidth: "1000px",
            }}
            onClick={Click}
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
          <Headerdiv>나의 크롤링</Headerdiv>
          {data.length ? (
            <Bodydiv>
              {data.map((item: any, index:any) => (
                <Settingdiv
                  style={{width:"80%"}}
                  onClick={() =>
                    (window.location.href = `/specificcrawling/${item.settingId}`)
                  }
                  key={index}
                >
                  <Settingtitlediv>{item.name}</Settingtitlediv>
                  <Settingtitlediv>{item.url}</Settingtitlediv>
                  <Settingtagdiv>
                    {item.keywords.map((items: any) => (
                      <Settingtag>#️{items}</Settingtag>
                    ))}
                  </Settingtagdiv>
                </Settingdiv>
              ))}
            </Bodydiv>
          ) : (
            <Bodydiv
              style={{
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              등록된 크롤링이 없습니다.
            </Bodydiv>
          )}
          <Btn onClick={Click} name="크롤링 생성"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
