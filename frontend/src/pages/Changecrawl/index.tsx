import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Tagdiv } from "../../components/Tagdiv";
import { Exitbtn } from "../../components/Exitbtn";
import { crawlAPI } from "../../utils/axios";
import {
  Userprofilediv1,
  Formdiv1,
  Removebtn,
  Keworddiv,
  Alarmdiv,
  Addbtn,
} from "./style";
import Btn from "../../components/Button";
import {
  Radio,
  Switch,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

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

const ChangeCrawl = ({ match }: any) => {
  const { id } = match.params;
  const jwt = localStorage.getItem("jwt");
  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [isopen, setIsopen] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [value, setValue] = React.useState("or");
  const [time, setTime] = React.useState(1);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = React.useState([]);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const keywords: any[] = [];
  // const [keyword1, setKeyword1] = useState("")
  // const [keyword2, setKeyword2] = useState("")
  // const [keyword3, setKeyword3] = useState("")
  // const [keyword4, setKeyword4] = useState("")
  // const [keyword5, setKeyword5] = useState("")
  const [inputs, setInputs] = useState({
    keyword1: "",
    keyword2: "",
    keyword3: "",
    keyword4: "",
    keyword5: "",
  });
  const {
    keyword1,
    keyword2,
    keyword3,
    keyword4,
    keyword5,
    // keyword6,
    // keyword7,
    // keyword8,
  } = inputs;
  useEffect(() => {
    const getData = async () => {
      await crawlAPI
        .getSettingDetail(jwt, id)
        .then(({ data }: any) => {
          setUrl(data.url);
          setName(data.name);
          setData(data.allSettingData);
          setValue(data.type);
          setTime(data.period);
          setChecked(data.mailAlarm);
          setChecked2(data.smsAlarm);
          setKeyword(data.keywords);
          setInputs({
            ["keyword1"]: data.keywords[0],
            ["keyword2"]: data.keywords[1],
            ["keyword3"]: data.keywords[2],
            ["keyword4"]: data.keywords[3],
            ["keyword5"]: data.keywords[4]
          });
          
          })
        .catch((e) => console.log(e));
    };
    

    getData();
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, defaultValue } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const deleteCrawl = async () => {
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");
    if(window.confirm("정말 삭제하시겠습니까?")){
      await crawlAPI.deleteSetting(id, jwt, email).then(() => {
        window.location.href = "/settingprofile";
      });
    }
  };
  const updateCrawl = async () => {
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");
    keywords.push(keyword1);
    keywords.push(keyword2);
    keywords.push(keyword3);
    keywords.push(keyword4);
    keywords.push(keyword5);

    await crawlAPI
      .editSetting(
        id,
        jwt,
        email,
        keywords,
        checked,
        name,
        time,
        checked2,
        value,
        url
      )
      .then(() => {
        window.location.href = "/settingprofile";
      });
  };
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleExit = () => {
    setIsopen(false);

  };

  const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
  };
  const timeChange = (event: any) => {
    setTime(event.target.value);
  };
  return (
    <div>
      {/* {isMobile ? <AppAppBar /> : undefined} */}
      <AppAppBar />
      <Desktop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv1 style={{ fontSize: "24px" }}>
            크롤링 변경
          </Userprofilediv1>
          <Formdiv1
            style={{
              height: "900px",
              maxWidth: "1000px",
              boxShadow: "5px 5px 5px 5px grey",
            }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChangeUrl}
                value={url}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div style={{ width: "100%", marginTop: "12px" }}>
              <TextField
                label="이름"
                name="name"
                onChange={onChangeName}
                value={name}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "medium",
                fontFamily: "Roboto",
                margin: "24px 0",
              }}
            >
              키워드
            </div>
            <Keworddiv style={{ height: "400px" }}>
              {isopen ? (
                <Tagdiv>
                  <Exitbtn onClick={handleExit}>
                    <ClearIcon></ClearIcon>
                  </Exitbtn>
                  <TextField
                    label="Keyword"
                    onChange={tagChange}
                    value={tag}
                    required
                    style={{
                      width: "70%",
                    }}
                  ></TextField>
                  <Addbtn
                    style={{ alignSelf: "center" }}
                  >
                    <AddIcon />
                    ADD
                  </Addbtn>
                </Tagdiv>
              ) : (
                <div style={{ height: "100%", width: "100%" }}>
                  {keyword.length ? (
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {keyword.map((item, key) => (
                        <div
                          key={key}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "8px 0",
                          }}
                        >
                          <TextField
                            label={`키워드${key + 1}`}
                            name={`keyword${key + 1}`}
                            defaultValue={item}
                            onChange={onChange}
                            style={{ width: "70%" }}
                          ></TextField>
                          {/* <Removebtn onClick={() => console.log("remove")}>
                            <RemoveIcon />
                          </Removebtn> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ADD 버튼을 눌러 tag를 추가해주세요.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>

            {/* <Addbtn onClick={handleAdd}>
              <AddIcon />
              ADD
            </Addbtn> */}
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px" }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">주기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={1}>1시간</MenuItem>
                  <MenuItem value={2}>2시간</MenuItem>
                  <MenuItem value={3}>3시간</MenuItem>
                  <MenuItem value={4}>4시간</MenuItem>
                  <MenuItem value={6}>6시간</MenuItem>
                  <MenuItem value={12}>12시간</MenuItem>
                  <MenuItem value={24}>24시간</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>메일 알람</Alarmdiv>

                <Switch
                  color="default"
                  checked={checked}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>SMS 알람</Alarmdiv>
                <Switch
                  color="default"
                  checked={checked2}
                  onChange={handleChange2}
                />
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn
            style={{ width: "93%", maxWidth: "1032px" }}
            name="크롤링 변경"
            onClick={updateCrawl}
          ></Btn>
          <Btn
            style={{
              marginBottom: "24px",
              backgroundColor: "#d62b4b",
              width: "93%",
              maxWidth: "1032px",
            }}
            name="크롤링 삭제"
            onClick={deleteCrawl}
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
          <Userprofilediv1>크롤링 변경</Userprofilediv1>
          <Formdiv1>
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChangeUrl}
                value={url}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div style={{ width: "100%", marginTop: "12px" }}>
              <TextField
                label="이름"
                name="name"
                onChange={onChangeName}
                value={name}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                fontWeight: "bold",
                fontStyle: "medium",
                fontFamily: "Roboto",
                margin: "24px 0",
              }}
            >
              {/* <RadioGroup
                row
                aria-label="condition"
                defaultValue="and"
                name="row-radio-buttons-group"
                onChange={radioChange}
              >
                <FormControlLabel
                  value="and"
                  control={<Radio color="default" />}
                  label="AND"
                />
                <FormControlLabel
                  value="or"
                  control={<Radio color="default" />}
                  label="OR"
                />
              </RadioGroup> */}
              키워드
            </div>
            <Keworddiv style={{}}>
              {isopen ? (
                <Tagdiv
                  style={{
                    width: "90%",
                    height: "400px",
                    zIndex: 2,
                    marginTop: "0px",
                  }}
                >
                  <Exitbtn onClick={handleExit}>
                    <ClearIcon></ClearIcon>
                  </Exitbtn>
                  <TextField
                    label="Keyword"
                    onChange={tagChange}
                    value={tag}
                    required
                    style={{
                      width: "70%",
                      margin: "24px 0",
                    }}
                  ></TextField>
                  <Addbtn
                    style={{ alignSelf: "center" }}
                    onClick={() => console.log("add")}
                  >
                    <AddIcon />
                    ADD
                  </Addbtn>
                </Tagdiv>
              ) : (
                <div>
                  {keyword.length ? (
                    <div style={{ width: "100%" }}>
                      {keyword.map((item, key) => (
                        <div
                          key={key}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "8px 0",
                          }}
                        >
                          <TextField
                            label={`키워드${key + 1}`}
                            name={`keyword${key + 1}`}
                            defaultValue={item}
                            onChange={onChange}
                            style={{ width: "100%" }}
                          ></TextField>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ADD 버튼을 눌러 tag를 추가해주세요.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px" }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">주기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={1}>1시간</MenuItem>
                  <MenuItem value={2}>2시간</MenuItem>
                  <MenuItem value={3}>3시간</MenuItem>
                  <MenuItem value={4}>4시간</MenuItem>
                  <MenuItem value={6}>6시간</MenuItem>
                  <MenuItem value={12}>12시간</MenuItem>
                  <MenuItem value={24}>24시간</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>메일 알람</Alarmdiv>

                <Switch
                  color="default"
                  checked={checked}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>SMS 알람</Alarmdiv>
                <Switch
                  color="default"
                  checked={checked2}
                  onChange={handleChange2}
                />
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn name="크롤링 변경" onClick={updateCrawl}></Btn>
          <Btn
            style={{ marginBottom: "24px", backgroundColor: "#d62b4b" }}
            name="크롤링 삭제"
            onClick={deleteCrawl}
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default ChangeCrawl;
