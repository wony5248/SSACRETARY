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
    border : 1px solid #D8D8D8;
    color: #424242;
`;
export const Settingdiv = styled.div`
    border: 1px solid rgba(98, 0, 238, 0.2);
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
    padding-left:4px;
    margin-bottom: 12px;
`;
export const Settingtagdiv = styled.div`
    border-radius: 8px;
    display: flex;
    padding-left:4px;
    justify-content:flex-start
    
`;
export const Settingtag = styled.div`
    background-color: rgba(98, 0, 238, 0.2);
    color: white;
    padding: 0 4px;
    display:flex;
    justify-content:center;
    min-width:40px;
    margin-right:12px;
    align-items:center;
    border: none;
    width:auto;
    border-radius: 12px;
`;