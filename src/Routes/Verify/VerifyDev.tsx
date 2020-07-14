import React, { useEffect } from "react";

import { Formik, Form } from "formik";

import FormLayout from "./FormLayout";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as yup from "yup";

interface Props {
  email: string;
}

const VERIFY = gql`
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
  otp: yup.string().required("Required"),
});

const Verify: React.FC<Props> = ({ email }) => {
  const [verify, { loading, error, data }] = useMutation(VERIFY);
  useEffect(() => {
    (async () => {
      if (data && data.verify.token) {
        const currToken = await localStorage.getItem("userToken");
        if (currToken !== data.verify.token) {
          await localStorage.setItem("userToken", data.verify.token);
          window.location.reload();
        }
      }
    })();
  }, [data]);
  return (
    <Formik
      initialValues={{ otp: "", email }}
      validationSchema={VerifySchema}
      onSubmit={({ email, otp }) =>
        verify({
          variables: { email, otp },
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
};

export default Verify;
