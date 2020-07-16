import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { useIsMobileSize } from "lib/hooks";

const FormContainer: React.FC = ({ children }) => {
  const isMobileSize = useIsMobileSize();
  return (
    <Grid container justify="center">
      {isMobileSize ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <Paper>{children}</Paper>
      )}
    </Grid>
  );
};

export default FormContainer;
