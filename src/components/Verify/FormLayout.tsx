import React from "react";

import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { Field } from "formik";

import TextField from "../lib/Form/TextField";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(4)
    }
  });

interface Props {
  classes: {
    button: string;
  };
  dirty: boolean;
  isSubmitting: boolean;
  error: boolean;
}

const VerifyLayout: React.FC<Props> = ({
  classes,
  dirty,
  isSubmitting,
  error
}) => (
  <React.Fragment>
    <Field type="hidden" name="email" />
    <Field
      type="text"
      name="otp"
      label="Enter One Time Password"
      variant="outlined"
      component={TextField}
    />
    <Grid container justify="flex-end">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={isSubmitting || !dirty}
      >
        Verify
      </Button>
    </Grid>
    {error ? (
      <FormHelperText error={true}>
        Something went wrong, please try again
      </FormHelperText>
    ) : null}
  </React.Fragment>
);

export default withStyles(styles)(VerifyLayout);
