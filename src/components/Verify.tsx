import React from "react";

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

import { setProfile } from "../store/profile/actions";
import store from "../store";

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

const LOGIN = gql`
  mutation Verify($email: String!, $otp: String!) {
    verify(email: $email, otp: $otp) {
      token
    }
  }
`;

interface VerifyData {
  verify: {
    token: string;
  };
}

interface VerifyVariables {
  email: string;
  otp: string;
}

const VerifySchema = yup.object().shape({
  otp: yup.string().required("Required")
});

const Verify: React.FC<Props> = props => (
  <RootDiv>
    <ContentDiv withPaper>
      <Mutation<VerifyData, VerifyVariables> mutation={LOGIN}>
        {(verify, { loading, error, data }) => {
          (async () => {
            if (data && data.verify.token) {
              const currToken = await localStorage.getItem("accessToken");
              if (currToken !== data.verify.token) {
                await localStorage.setItem("accessToken", data.verify.token);
              }
              store.dispatch(setProfile({ email: props.location.state.email }));
            }
          })();
          return (
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={VerifySchema}
              onSubmit={({ otp }) =>
                verify({
                  variables: { email: props.location.state.email, otp }
                })
              }
            >
              {({ dirty }) => (
                <Form noValidate>
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
                    disabled={loading || !dirty}
                  >
                    Verify
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

export default withStyles(styles)(Verify);
