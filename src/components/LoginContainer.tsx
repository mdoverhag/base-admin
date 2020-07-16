import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { useIsMobileSize } from "lib/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  fullScreen: {
    height: "100vh",
  },
  container: theme.mixins.gutters({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  }),
}));

const LoginContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const isMobileSize = useIsMobileSize();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.fullScreen}
    >
      <Container maxWidth="xs">
        {isMobileSize ? (
          <Grid item className={classes.container}>
            {children}
          </Grid>
        ) : (
          <Paper>
            <Grid item className={classes.container}>
              {children}
            </Grid>
          </Paper>
        )}
      </Container>
    </Grid>
  );
};

export default LoginContainer;
