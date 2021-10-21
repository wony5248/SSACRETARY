import React from "react";
import styled from "styled-components";

export const Headerdiv = styled.div`
    display:flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 24px;
`;
export const Bodydiv = styled.div`
    display : flex;
    flex-direction: column;
    align-items:center;
    height: 500px;
    width: 90%;
    overflow: auto;
    border-radius: 8px;
    border : 1px solid black;
`;
export const Settingdiv = styled.div`
    border: 1px solid #6200EE;
    width: 360px;
    border-radius: 8px;
    margin-top:12px;
    margin-bottom: 12px;
    min-height: 88px;
`;
export const Settingtitlediv = styled.div`
    width: 100%;
    border-radius: 8px;
    margin-top:4px;
    margin-bottom: 12px;
`;
export const Settingtagdiv = styled.div`
    border-radius: 8px;
    display: flex;
`;
export const Settingtag = styled.div`
    background-color: #6200EE;
    color: white;
    text-align:center;
    display:flex;
    align-items:center;
    border: none;
    width:auto;
    border-radius: 12px;
`;