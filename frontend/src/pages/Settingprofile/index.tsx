import React from "react";
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
const data = [
  {
    title: "제목1",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
  {
    title: "제목2",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
  {
    title: "제목3",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
  {
    title: "제목4",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
  {
    title: "제목5",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
  {
    title: "제목1",
    tag1: "MySQL",
    tag2: "스프링",
    tag3: "리액트",
    tag4: "뷰",
  },
];
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
          <Headerdiv style={{fontSize:"24px"}}>Crawlings</Headerdiv>
          <Bodydiv style={{height: "1000px", maxWidth:"1000px",display:"flex", flexDirection:"column", boxShadow:"5px 5px 5px 5px grey",justifyContent:"space-between"}}>
            {data.map((item, index) => (
              <Settingdiv onClick={() => console.log(index)} style={{width:"60%"}} key={index}>
                <Settingtitlediv>{item.title}</Settingtitlediv>
                <Settingtagdiv>
                  <Settingtag>#️{item.tag1}</Settingtag>
                  <Settingtag>#️{item.tag2}</Settingtag>
                  <Settingtag>#️{item.tag3}</Settingtag>
                  <Settingtag>#️{item.tag4}</Settingtag>
                </Settingtagdiv>
              </Settingdiv>
            ))}
          </Bodydiv>
          <Btn style={{marginTop:"48px", width:"90%", maxWidth:"1000px"}} onClick={Click} name="Make Crawl"></Btn>
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
            {data.map((item, index) => (
              <Settingdiv onClick={() => console.log(index)} key={index}>
                <Settingtitlediv>{item.title}</Settingtitlediv>
                <Settingtagdiv>
                  <Settingtag>#️{item.tag1}</Settingtag>
                  <Settingtag>#️{item.tag2}</Settingtag>
                  <Settingtag>#️{item.tag3}</Settingtag>
                  <Settingtag>#️{item.tag4}</Settingtag>
                </Settingtagdiv>
              </Settingdiv>
            ))}
          </Bodydiv>
          <Btn  onClick={Click} name="Make Crawl"></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default SettingProfile;
