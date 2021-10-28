import styled from "styled-components";

export const Userprofilediv = styled.div`
    display:flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 24px;
    font-weight:bold;
    font-style:medium;
    font-family:Roboto;
`;
export const Formdiv = styled.div`
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
export const Checkbtn = styled.button`
    border: 1px solid #6200EE;
    width: 20%;
    color:white;
    height:100%;
    background-color:#6200EE;
`
export const Profilediv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;
export const Profileinput = styled.input`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  width: 90%;
  overflow: auto;
  border-radius: 8px;
  // border : 1px solid black;
`;
export const Duplicate = styled.div`
  border: 1px solid #6200ee;
  width: 360px;
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 12px;
  min-height: 88px;
`;

export const Styledbtn = styled.button`
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