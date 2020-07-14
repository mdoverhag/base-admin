import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
  },
}));

const RootDiv: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.root}
    >
      <Container maxWidth="xs">
        {isMobile ? (
          <Paper>{children}</Paper>
        ) : (
          <React.Fragment>{children}</React.Fragment>
        )}
      </Container>
    </Grid>
  );
};

export default RootDiv;
