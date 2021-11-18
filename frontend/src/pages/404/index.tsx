import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Container } from "../../components/Container";
import { CommonDiv } from "../../components/CommonDiv";
import { HeadlineH1 } from "../../components/Headline";

const notFound: React.FunctionComponent = function () {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Container>
        <CommonDiv>
          <HeadlineH1>404:NOT FOUND</HeadlineH1>
        </CommonDiv>
        <CommonDiv>
          <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
            <Button
              style={{ width: "200px" }}
              variant="outlined"
              color="primary"
            >
              Go Home
            </Button>
          </Link>
        </CommonDiv>
      </Container>
    </div>
  );
};

export default notFound;
