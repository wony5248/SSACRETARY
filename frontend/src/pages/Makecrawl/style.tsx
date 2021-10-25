import React from "react";
import styled from "styled-components";

export const Userprofilediv1 = styled.div`
    display:flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 24px;
    font-weight:bold;
    font-style:medium;
    font-family:Roboto;
`;
export const Formdiv1 = styled.div`
    display : flex;
    flex-direction: column;
    border:1px solid #D8D8D8;
    justify-content:space-between;
    align-items:center;
    height: 260px;
    padding: 16px 16px;
    margin-top:48px;
    width: 90%;
    overflow: auto;
    margin-bottom:48px;
    border-radius: 8px;
`;
export const Checkbtn1 = styled.button`
    border: 1px solid #6200EE;
    width: 20%;
    color:white;
    height:100%;
    background-color:#6200EE;
`;

export const Styledbtn1 = styled.button`
  margin-top: 24px;
  background-color: #D62B4B;
  color: white;
  border: none;
  outline: none;
  width: 328px;
  height: 36px;
  &:hover {
    background-color: #a3cca3;
  }
`;