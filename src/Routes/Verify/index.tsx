import React from "react";
import { useLocation } from "react-router-dom";

import Layout from "./Layout";
import VerifyDev from "./VerifyDev";
import VerifyProd from "./VerifyProd";

import { get } from "lodash";

const VerifyImpl =
  process.env.NODE_ENV === "development" ? VerifyDev : VerifyProd;

const Verify: React.FC = () => {
  const location = useLocation();
  const email = get(location, "state.email", "");
  return (
    <Layout email={email}>
      <VerifyImpl email={email} />
    </Layout>
  );
};

export default Verify;
