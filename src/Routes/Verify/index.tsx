import React from "react";
import { useLocation } from "react-router-dom";

import Layout from "Routes/Verify/Layout";
import VerifyDev from "Routes/Verify/VerifyDev";
import VerifyProd from "Routes/Verify/VerifyProd";

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
