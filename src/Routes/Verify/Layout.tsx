import React from "react";

import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";

import ContentDiv from "../../components/ContentDiv";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import history from "../../lib/history";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

interface Props {
  email: string;
}

const VerifyLayout: React.FC<Props> = ({ children, email }) => {
  const classes = useStyles();
  return (
    <ContentDiv>
      <Grid container justify="center">
        <Typography variant="h5" gutterBottom>
          Check your email!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          We have sent you a One Time Password
        </Typography>
        <Chip
          icon={<MailIcon />}
          label={email}
          variant="outlined"
          size="small"
          onClick={() => {
            history.push("/login");
          }}
          onDelete={() => {
            history.push("/login");
          }}
          className={classes.chip}
        />
      </Grid>
      {children}
    </ContentDiv>
  );
};

export default VerifyLayout;
