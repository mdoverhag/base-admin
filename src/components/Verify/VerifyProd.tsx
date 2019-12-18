import React from "react";

import { Formik } from "formik";

import FormLayout from "./FormLayout";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as yup from "yup";

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
  email: string;
}

const VerifySchema = yup.object().shape({
  otp: yup.string().required("Required")
});

const Verify: React.FC<Props> = ({ classes, email }) => (
  <Formik
    initialValues={{ otp: "", email }}
    validationSchema={VerifySchema}
    onSubmit={() => {}}
  >
    {({ dirty, errors, isSubmitting, status, touched }) => (
      <form noValidate>
        <FormLayout
          dirty={dirty}
          isSubmitting={isSubmitting}
          error={Boolean(status && status.error)}
          errors={errors}
          touched={touched}
        />
      </form>
    )}
  </Formik>
);

export default withStyles(styles)(Verify);
