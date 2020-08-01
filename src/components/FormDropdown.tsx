import React from "react";

import { FieldProps } from "formik";

import TextField from "@material-ui/core/TextField";

const FormText: React.FC<FieldProps> = ({
  field: { ...fields },
  form: { submitCount, touched, errors },
  ...props
}: FieldProps) => (
  <TextField
    select
    fullWidth
    margin="normal"
    error={Boolean(submitCount > 0 && errors[fields.name])}
    helperText={submitCount > 0 && errors[fields.name]}
    SelectProps={{
      native: true,
    }}
    {...props}
    {...fields}
  />
);

export default FormText;
