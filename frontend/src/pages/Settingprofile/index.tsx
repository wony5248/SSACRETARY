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
  const [data, setData] = useState([])
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    const getCrawl = async () => {
      await crawlAPI.getAllSettings(jwt).then(({data}:any) => {
        console.log(data.allSettingData)
        setData(data.allSettingData)
      }).catch((e) => console.log(e))

      
    };

    getCrawl();
  }, []);
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
          <Headerdiv style={{ fontSize: "24px" }}>Crawlings</Headerdiv>
          <Bodydiv
            style={{
              height: "1000px",
              maxWidth: "1000px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "5px 5px 5px 5px grey",
            }}
          >
            {data.map((item :any, index) => (
              <Settingdiv
                onClick={() => window.location.href=`/specificcrawling/${item.settingId}`}
                style={{ width: "60%" }}
                key={index}
              >
                <Settingtitlediv>{item.url}</Settingtitlediv>
                <Settingtagdiv>
                  {item.keywords.map((items:any) => (
                    <Settingtag>#️{items}</Settingtag>
                  ))}
                  
                </Settingtagdiv>
              </Settingdiv>
            ))}
          </Bodydiv>
          <Btn
            style={{
              marginBottom: "48px",
              marginTop: "48px",
              width: "90%",
              maxWidth: "1000px",
            }}
            onClick={Click}
            name="Make Crawl"
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
          <Headerdiv>Crawlings</Headerdiv>
          <Bodydiv>
            {data.map((item :any, index) => (
              <Settingdiv onClick={() => window.location.href=`/specificcrawling/${item.settingId}`} key={index}>
                <Settingtitlediv>{item.url}</Settingtitlediv>
                <Settingtagdiv>
                {item.keywords.map((items:any) => (
                    <Settingtag>#️{items}</Settingtag>
                  ))}
                </Settingtagdiv>
              </Settingdiv>
            ))}
          </Bodydiv>
          <Btn onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
