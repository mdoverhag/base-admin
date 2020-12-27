import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Field, Formik, Form } from "formik";

import FormButtons from "components/FormButtons";
import FormContainer from "components/FormContainer";
import FormDropdown from "components/FormDropdown";
import FormSection from "components/FormSection";
import FormText from "components/FormText";

import history from "lib/history";
import { useGetUser, useUpdateUser, useDeleteUser } from "lib/queries";

interface UpdateUserRouteParams {
  id: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<UpdateUserRouteParams>();
  const { loading, error, data } = useGetUser(id);
  const [updateUser, { data: userDataUpdated }] = useUpdateUser();
  const [deleteUser, { data: userDeleted }] = useDeleteUser();
  useEffect(() => {
    if (userDataUpdated && userDataUpdated.update_user.id) {
      history.push("/users");
    }
  }, [userDataUpdated]);
  useEffect(() => {
    if (userDeleted && userDeleted.delete_user.id) {
      history.push("/users");
    }
  }, [userDeleted]);
  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;
  if (!(data && data.get_user)) return <span>{`Error! No data from API`}</span>;
  return (
    <FormContainer>
      <Formik
        initialValues={data.get_user}
        onSubmit={({ name, email, role }) => {
          updateUser({ variables: { id, name, email, role } });
        }}
      >
        {({ values }) => (
          <Form noValidate>
            <FormSection>
              <Typography variant="h6" gutterBottom>
                {values.name}
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
              onDelete={() => deleteUser({ variables: { id: values.id } })}
              onCancel={() => history.push("/users")}
              submitLabel="Update User"
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UpdateUser;
