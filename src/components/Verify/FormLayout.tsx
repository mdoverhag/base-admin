import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, FormikErrors, FormikTouched } from "formik";

import TextField from "../lib/Form/TextField";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import history from "../../lib/history";

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      marginTop: theme.spacing(4)
    },
    backButtonContainer: {
      height: "100%"
    }
  });

interface Props {
  classes: {
    buttonContainer: string;
    backButtonContainer: string;
  };
  dirty: boolean;
  isSubmitting: boolean;
  error: boolean;
  errors: FormikErrors<{ email: string; otp: string }>;
  touched: FormikTouched<{ email: string; otp: boolean }>;
}

const VerifyLayout: React.FC<Props> = ({
  classes,
  dirty,
  isSubmitting,
  error,
  errors,
  touched
}) => (
  <React.Fragment>
    <Field type="hidden" name="email" />
    <Field
      type="text"
      name="otp"
      label="Enter One Time Password"
      variant="outlined"
      component={TextField}
      error={error || (errors.email && touched.email)}
      helperText={
        errors.email && touched.email
          ? errors.email
          : error
          ? "Something went wrong, please try again"
          : " "
      }
    />
    <Grid container justify="space-between" className={classes.buttonContainer}>
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          className={classes.backButtonContainer}
        >
          <Link
            onClick={() => {
              history.push("/login");
            }}
          >
            Wrong email?
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || !dirty}
      >
        Verify
      </Button>
    </Grid>
  </React.Fragment>
);

export default withStyles(styles)(VerifyLayout);
