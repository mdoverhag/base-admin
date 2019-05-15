import React from "react";

import Grid from "@material-ui/core/Grid";

import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = createStyles({
  root: {
    flexGrow: 1
  }
});

interface Props {
  classes: {
    root: string;
  };
}

const RootDiv: React.FC<Props> = props => (
  <div className={props.classes.root}>
    <Grid item xs={12}>
      <Grid container alignItems="center" direction="column">
        {props.children}
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(RootDiv);
