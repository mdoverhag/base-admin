import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";
import { Mutation } from "react-apollo";

import ContentDiv from "./lib/ContentDiv";
import TextField from "./lib/Form/TextField";

import gql from "graphql-tag";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as yup from "yup";

import history from "../lib/history";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center"
    },
    button: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1)
    }
  });

const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      email
      message
    }
  }
`;

interface Props {
  classes: {
    title: string;
    button: string;
  };
}

interface LoginData {
  login: {
    email: string;
    message: string;
  };
}

interface LoginVariables {
  email: string;
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Required")
});

const Login: React.FC<Props> = ({ classes }) => {
  const [verifyEmail, setVerifyEmail] = useState();
  useEffect(() => {
    if (verifyEmail) {
      history.push("/login/verify", { email: verifyEmail });
    }
  }, [verifyEmail]);
  return (
    <ContentDiv>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Sign in
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.title}>
        to continue to Base Admin
      </Typography>
      <Mutation<LoginData, LoginVariables> mutation={LOGIN}>
        {(login, { loading, error, data }) => {
          if (data) setVerifyEmail(data.login.email);
          return (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={LoginSchema}
              onSubmit={({ email }) => login({ variables: { email } })}
            >
              {({ dirty }) => (
                <Form noValidate>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    component={TextField}
                  />
                  <Grid container justify="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={!error && (loading || !dirty)}
                    >
                      Next
                    </Button>
                  </Grid>
                  {error ? (
                    <FormHelperText error={true}>
                      Something went wrong, please try again
                    </FormHelperText>
                  ) : null}
                </Form>
              )}
            </Formik>
          );
        }}
      </Mutation>
    </ContentDiv>
  );
};

export default withStyles(styles)(Login);
