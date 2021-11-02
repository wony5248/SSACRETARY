import styled from "styled-components";

export const Userprofilediv1 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  font-weight: bold;
  font-style: medium;
  font-family: Roboto;
`;
export const Styledlabel = styled.div`
  background-color: #e6e6e6;
  height: 100%;
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: space-evenly;
`;
export const Keworddiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  width: 100%;
  overflow: auto;
  border: 1px solid #d8d8d8;
  margin-bottom: 24px;
`;
export const Formdiv1 = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d8d8d8;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  margin-top: 24px;
  width: 90%;
  border-radius: 8px;
`;
export const Alarmdiv = styled.div`
  width: 62%;
  display:flex;
  height: 56px;
  justify-content:flex-start;
  padding: 0 4%;
  align-items:center;
  background-color:#E6E6E6;
`;
export const Addbtn = styled.button`
  border-radius: 8px;
  width: 113px;
  cursor:pointer;
  color: white;
  border: none;
  display: flex;
  margin-bottom:24px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  height: 36px;
  background-color: #6200ee;
`;
export const Removebtn = styled.button`
  border-radius: 100px;
  width: 56px;
  color: white;
  cursor:pointer;
  border: none;
  height: 56px;
  background-color: #d62b4b;
`;

export const Styledbtn1 = styled.button`
  margin: 24px 0;
  background-color: #d62b4b;
  color: white;
  border: none;
  outline: none;
  width: 328px;
  height: 36px;
  &:hover {
    background-color: #a3cca3;
  }
`;
