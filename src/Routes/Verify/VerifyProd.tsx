import React from "react";

import { Formik } from "formik";

import FormLayout from "./FormLayout";

import * as yup from "yup";

interface Props {
  email: string;
}

const VerifySchema = yup.object().shape({
  otp: yup.string().required("Required"),
});

const Verify: React.FC<Props> = ({ email }) => (
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

export default Verify;
