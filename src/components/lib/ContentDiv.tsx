import React from "react";

import Grid from "@material-ui/core/Grid";

import RootDiv from "./RootDiv";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    root: theme.mixins.gutters({
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(6)
    })
  });

interface Props {
  classes: {
    root: string;
  };
}

const ContentDiv: React.FC<Props> = ({ classes, children }) => (
  <RootDiv>
    <Grid item className={classes.root}>
      {children}
    </Grid>
  </RootDiv>
);

export default withStyles(styles)(ContentDiv);
