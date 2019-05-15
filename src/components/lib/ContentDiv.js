import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const ContentDiv = props => (
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

ContentDiv.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContentDiv);
