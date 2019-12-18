import React from "react";

import { Formik, Form } from "formik";
import { Mutation } from "react-apollo";

import FormLayout from "./FormLayout";

import gql from "graphql-tag";
import * as yup from "yup";

interface Props {
  email: string;
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

const Verify: React.FC<Props> = ({ email }) => (
  <Mutation<VerifyData, VerifyVariables> mutation={LOGIN}>
    {(verify, { loading, error, data }) => {
      (async () => {
        if (data && data.verify.token) {
          const currToken = await localStorage.getItem("userToken");
          if (currToken !== data.verify.token) {
            await localStorage.setItem("userToken", data.verify.token);
            window.location.reload();
          }
        }
      })();
      return (
        <Formik
          initialValues={{ otp: "", email }}
          validationSchema={VerifySchema}
          onSubmit={({ email, otp }) =>
            verify({
              variables: { email, otp }
            })
          }
        >
          {({ dirty, errors, touched }) => (
            <Form noValidate>
              <FormLayout
                dirty={dirty}
                isSubmitting={loading}
                error={Boolean(error)}
                errors={errors}
                touched={touched}
              />
            </Form>
          )}
        </Formik>
      );
    }}
  </Mutation>
);

export default Verify;
