import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import ContentDiv from "./lib/ContentDiv";
import RootDiv from "./lib/RootDiv";

import { unsetProfile } from "../store/profile/actions";
import store from "../store";

const Logout: React.FC = () => {
  useEffect(() => {
    (async () => {
      await localStorage.removeItem("accessToken");
      store.dispatch(unsetProfile());
    })();
  });
  return (
    <RootDiv>
      <ContentDiv withPaper>
        You are logged out: <Link to="/login">Log in</Link>
      </ContentDiv>
    </RootDiv>
  );
};

export default Logout;
