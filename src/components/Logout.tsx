import React from "react";

import { Link } from "react-router-dom";

import ContentDiv from "./lib/ContentDiv";
import RootDiv from "./lib/RootDiv";

import auth from "../lib/auth";

const Logout: React.FC = () => {
  auth.logout();
  return (
    <RootDiv>
      <ContentDiv withPaper>
        You are logged out: <Link to="/login">Log in</Link>
      </ContentDiv>
    </RootDiv>
  );
};

export default Logout;
