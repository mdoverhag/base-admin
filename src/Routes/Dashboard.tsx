import React from "react";

import Typography from "@material-ui/core/Typography";

import ContentDiv from "components/ContentDiv";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <ContentDiv>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Welcome to Base Admin
      </Typography>
    </ContentDiv>
  );
};

export default Dashboard;
