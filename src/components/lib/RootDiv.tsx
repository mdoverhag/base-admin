import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { createStyles, withStyles } from "@material-ui/core/styles";
import withWidth, { WithWidth, isWidthUp } from "@material-ui/core/withWidth";

const styles = () =>
  createStyles({
    root: {
      height: "100vh"
    }
  });

interface Props extends WithWidth {
  classes: {
    root: string;
  };
}

const RootDiv: React.FC<Props> = ({ classes, children, width }) => {
  const isMobile = isWidthUp("sm", width);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.root}
    >
      <Container maxWidth="xs">
        {isMobile ? <Paper>{children}</Paper> : children}
      </Container>
    </Grid>
  );
};

export default withWidth()(withStyles(styles)(RootDiv));
