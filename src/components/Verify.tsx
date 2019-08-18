import React from "react";

import { Field, Formik } from "formik";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import ContentDiv from "./lib/ContentDiv";
import TextField from "./lib/Form/TextField";
import RootDiv from "./lib/RootDiv";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as yup from "yup";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1)
    }
  });

interface Props {
  classes: {
    button: string;
  };
  location: {
    state: {
      email: string;
    };
  };
}

const VerifySchema = yup.object().shape({
  otp: yup.string().required("Required")
});

const Verify: React.FC<Props> = props => (
  <RootDiv>
    <ContentDiv withPaper>
      <Formik
        initialValues={{ otp: "", email: props.location.state.email }}
        validationSchema={VerifySchema}
        onSubmit={() => {}}
      >
        {({ dirty, isSubmitting, status }) => (
          <form noValidate>
            <Field type="hidden" name="email" />
            <Field
              type="text"
              name="otp"
              label="Verification Code"
              component={TextField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={props.classes.button}
              disabled={isSubmitting || !dirty}
            >
              Verify
            </Button>
            {status && status.error ? (
              <FormHelperText error={true}>
                Something went wrong, please try again
              </FormHelperText>
            ) : null}
          </form>
        )}
      </Formik>
    </ContentDiv>
  </RootDiv>
);

export default withStyles(styles)(Verify);
