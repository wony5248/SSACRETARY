import React from "react";
import styled from "styled-components";
const Styleda = styled.a`
  color: black;
  &:visited {
    color: #a3cca3;
  }
`




const Atag = (props:any) => {
    const {href, name} = props
    return(
        <Styleda href={href}>{name}</Styleda>
    );
};


export default Atag;