import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";

import ContentDiv from "components/ContentDiv";
import TextField from "components/TextField";

import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import gql from "graphql-tag";
import * as yup from "yup";

import history from "lib/history";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      email
      message
    }
  }
`;

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
  email: yup.string().email("Invalid email").required("Required"),
});

const Login: React.FC = () => {
  const classes = useStyles();
  const [login, { loading, error, data }] = useMutation<
    LoginData,
    LoginVariables
  >(LOGIN);
  useEffect(() => {
    if (data && data.login.email) {
      history.push("/login/verify", { email: data.login.email });
    }
  }, [data]);
  return (
    <ContentDiv>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Sign in
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.title}>
        to continue to Base Admin
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={LoginSchema}
        onSubmit={({ email }) => login({ variables: { email } })}
      >
        {({ dirty, errors, touched }) => (
          <Form noValidate>
            <Field
              type="email"
              name="email"
              label="Email"
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
          </Form>
        )}
      </Formik>
    </ContentDiv>
  );
};

export default Login;
