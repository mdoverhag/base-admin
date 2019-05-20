import React from 'react';

import { FieldProps } from 'formik';

import TextField from '@material-ui/core/TextField';

export default ({
  field: { ...fields },
  form: { submitCount, touched, errors, ...rest },
  ...props
}: FieldProps) => (
  <TextField
    fullWidth
    margin="normal"
    {...props}
    {...fields}
    error={Boolean(submitCount > 0 && errors[fields.name])}
    helperText={submitCount > 0 && errors[fields.name]}
  />
);
