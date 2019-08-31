import React from "react";

import Layout from "./Layout";
import VerifyDev from "./VerifyDev";
import VerifyProd from "./VerifyProd";

const VerifyImpl =
  process.env.NODE_ENV === "development" ? VerifyDev : VerifyProd;

interface Props {
  location: {
    state: {
      email: string;
    };
  };
}

const Verify: React.FC<Props> = ({ location }) => {
  const email = location.state.email || "";
  return (
    <Layout email={email}>
      <VerifyImpl email={email} />
    </Layout>
  );
};

export default Verify;
