import React from "react";

import { Link } from "react-router-dom";

import ContentDiv from "./lib/ContentDiv";
import RootDiv from "./lib/RootDiv";

interface Props {
  unsetProfile(): void;
}

const Logout: React.FC<Props> = props => {
  props.unsetProfile();
  return (
    <RootDiv>
      <ContentDiv withPaper>
        You are logged out: <Link to="/login">Log in</Link>
      </ContentDiv>
    </RootDiv>
  );
};

export default Logout;
