import React, { useEffect } from "react";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";

import FormButtons from "components/FormButtons";
import FormContainer from "components/FormContainer";
import FormDropdown from "components/FormDropdown";
import FormSection from "components/FormSection";
import FormText from "components/FormText";

import history from "lib/history";
import { useCreateUser } from "lib/queries";

const CreateUser: React.FC = () => {
  const [createUser, { data }] = useCreateUser();
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
              <Field name="role" label="Role" component={FormDropdown}>
                <option key={"admin"} value={"admin"}>
                  Admin
                </option>
                <option key={"user"} value={"user"}>
                  User
                </option>
              </Field>
            </FormSection>
            <Divider />
            <FormButtons
              onCancel={() => history.push("/users")}
              submitLabel="Create User"
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default CreateUser;
