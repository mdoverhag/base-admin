import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    paper: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing(3)
    })
  });

interface Props {
  withPaper: boolean;
  classes: {
    paper: string;
  };
}

const ContentDiv: React.FC<Props> = props => (
  <Grid item xs={11}>
    {props.withPaper ? (
      <Paper className={props.classes.paper} elevation={4}>
        {props.children}
      </Paper>
    ) : (
      props.children
    )}
  </Grid>
);

export default withStyles(styles)(ContentDiv);
