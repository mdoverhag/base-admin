import React from "react";

import { Field, Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import ContentDiv from "./lib/ContentDiv";
import TextField from "./lib/Form/TextField";
import RootDiv from "./lib/RootDiv";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as yup from "yup";

import auth from "../lib/auth";

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
}

const VerifySchema = yup.object().shape({
  code: yup.string().required("Required")
});

const Verify: React.FC<Props> = props => (
  <RootDiv>
    <ContentDiv withPaper>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={VerifySchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          auth.verify(values.code).catch(err => {
            setSubmitting(false);
            if (err.description === "Wrong email or verification code.") {
              setErrors({
                code: "Wrong verification code."
              });
            } else {
              setErrors({
                code: "Unexpected error, please try again"
              });
            }
          });
        }}
      >
        {({ dirty, isSubmitting, status }) => (
          <Form noValidate>
            <Field
              type="text"
              name="code"
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
              <FormHelperText error={true}>{status.error}</FormHelperText>
            ) : null}
          </Form>
        )}
      </Formik>
    </ContentDiv>
  </RootDiv>
);

export default withStyles(styles)(Verify);
