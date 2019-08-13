import React, { useState, useEffect } from "react";

import { Field, Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Mutation } from "react-apollo";

import ContentDiv from "./lib/ContentDiv";
import TextField from "./lib/Form/TextField";
import RootDiv from "./lib/RootDiv";

import { gql } from "apollo-boost";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as yup from "yup";

import history from "../lib/history";

const styles = (theme: Theme) =>
  createStyles({
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

const Login: React.FC<Props> = props => {
  const [verifyEmail, setVerifyEmail] = useState();
  useEffect(() => {
    if (verifyEmail) {
      history.push("/login/verify", { email: verifyEmail });
    }
  }, [verifyEmail]);
  return (
    <RootDiv>
      <ContentDiv withPaper>
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
                      component={TextField}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={props.classes.button}
                      disabled={!error && (loading || !dirty)}
                    >
                      Sign In
                    </Button>
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
    </RootDiv>
  );
};

export default withStyles(styles)(Login);
