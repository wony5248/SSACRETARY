import React from "react";
import styled from "styled-components";

const Styledbtn = styled.button`
  margin-top: 24px;
  background-color: #1976d2;
  color: white;
  border: none;
  outline: none;
  cursor:pointer;
  width: 328px;
  height: 36px;
`;

const Btn = (props: any) => {
  const { onClick, name, style } = props;
  return <Styledbtn style={style} onClick={() => onClick()}>{name}</Styledbtn>;
};

export default Btn;
