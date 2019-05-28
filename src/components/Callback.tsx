import React, { useEffect } from "react";

import ContentDiv from "./lib/ContentDiv";
import RootDiv from "./lib/RootDiv";

import auth from "../lib/auth";

const Callback: React.FC = () => {
  useEffect(() => {
    auth.handleCallback();
  }, []);

  return (
    <RootDiv>
      <ContentDiv withPaper>Verifying</ContentDiv>
    </RootDiv>
  );
};

export default Callback;
