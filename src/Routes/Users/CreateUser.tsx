import React, { useEffect } from "react";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";

import FormButtons from "components/FormButtons";
import FormContainer from "components/FormContainer";
import FormSection from "components/FormSection";
import FormText from "components/FormText";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import history from "lib/history";

const CREATE_USER = gql`
  mutation($email: String!, $role: String, $name: String) {
    create_user(email: $email, role: $role, name: $name) {
      email
    }
  }
`;

interface CreateUserData {
  create_user: {
    email: string;
  };
}

interface CreateUserVariables {
  email: string;
  name?: string;
  role?: string;
}

const CreateUser: React.FC = () => {
  const [createUser, { data }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(CREATE_USER);
  useEffect(() => {
    if (data && data.create_user.email) {
      history.push("/users");
    }
  }, [data]);
  return (
    <FormContainer>
      <Formik
        initialValues={{ name: "", email: "", role: "user" }}
        onSubmit={({ name, email, role }) =>
          createUser({ variables: { email, name, role } })
        }
      >
        {() => (
          <Form noValidate>
            <FormSection>
              <Typography variant="h6" gutterBottom>
                Create User
              </Typography>
              <Field
                type="email"
                name="email"
                label="Email"
                component={FormText}
              />
              <Field name="name" label="Name" component={FormText} />
              <Field name="role" label="Role" component={FormText} />
            </FormSection>
            <Divider />
            <FormButtons onCancel={() => history.push("/users")} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default CreateUser;
