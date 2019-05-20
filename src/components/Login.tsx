import React from 'react';

import { Field, Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import ContentDiv from './lib/ContentDiv';
import TextField from './lib/Form/TextField';
import RootDiv from './lib/RootDiv';

import { createStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import * as yup from 'yup';

import history from '../lib/history';

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
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup.string().required('Required')
});

const Login: React.FC<Props> = props => (
  <RootDiv>
    <ContentDiv withPaper>
      <Formik
        initialValues={{}}
        validationSchema={LoginSchema}
        onSubmit={() => {
          history.push('/app');
        }}
      >
        {({ dirty, isSubmitting, status }) => (
          <Form noValidate>
            <Field
              type="email"
              name="email"
              label="Email"
              component={TextField}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              component={TextField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={props.classes.button}
              disabled={isSubmitting || !dirty}
            >
              Sign In
            </Button>
            {status && status.error ? (
              <FormHelperText error={true}>{status.error}</FormHelperText>
            ) : null}
          </Form>
        )}
      </Formik>
    </ContentDiv>
  </RootDiv>
);

export default withStyles(styles)(Login);
