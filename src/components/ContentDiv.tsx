import React from "react";

import Grid from "@material-ui/core/Grid";

import RootDiv from "./RootDiv";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  }),
}));

const ContentDiv: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <RootDiv>
      <Grid item className={classes.root}>
        {children}
      </Grid>
    </RootDiv>
  );
};

export default ContentDiv;
