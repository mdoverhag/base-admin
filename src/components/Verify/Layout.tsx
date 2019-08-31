import React from "react";

import Typography from "@material-ui/core/Typography";

import ContentDiv from "../lib/ContentDiv";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center"
    }
  });

interface Props {
  classes: {
    title: string;
  };
  email: string;
}

const VerifyLayout: React.FC<Props> = ({ children, classes, email }) => (
  <ContentDiv>
    <Typography variant="h5" gutterBottom className={classes.title}>
      Check your email!
    </Typography>
    <Typography variant="subtitle1" gutterBottom className={classes.title}>
      We've sent you a One Time Password
    </Typography>
    <Typography variant="subtitle2" gutterBottom className={classes.title}>
      {`${email}`}
    </Typography>
    {children}
  </ContentDiv>
);

export default withStyles(styles)(VerifyLayout);
