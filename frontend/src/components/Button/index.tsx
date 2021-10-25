import React from "react";
import styled from "styled-components";

const Styledbtn = styled.button`
  margin-top: 24px;
  background-color: #6200ee;
  color: white;
  border: none;
  outline: none;
  width: 328px;
  height: 36px;
  &:hover {
    background-color: #a3cca3;
  }
`;

const Btn = (props: any) => {
  const { onClick, name } = props;
  return <Styledbtn onClick={() => onClick()}>{name}</Styledbtn>;
};

export default Btn;
