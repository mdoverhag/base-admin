import React from "react";

import Typography from "@material-ui/core/Typography";

import GenericContentContainer from "components/GenericContentContainer";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  title: {
    textAlign: "center",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GenericContentContainer>
        <Typography variant="h4" gutterBottom className={classes.title}>
          Welcome to Base Admin
        </Typography>
      </GenericContentContainer>
    </div>
  );
};

export default Dashboard;
