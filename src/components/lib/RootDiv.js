import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const RootDiv = props => (
  <div className={props.classes.root}>
    <Grid item xs={12}>
      <Grid container alignItems="center" direction="column">
        {props.children}
      </Grid>
    </Grid>
  </div>
);

RootDiv.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RootDiv);
