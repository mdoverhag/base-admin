import React from "react";

import {
  AUTH_LOGOUT,
  Admin as ReactAdmin,
  Create,
  Datagrid,
  DeleteButton,
  DisabledInput,
  Edit,
  EditButton,
  List,
  Resource,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from "react-admin";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, withStyles, withTheme } from "@material-ui/core/styles";
import buildGraphQLProvider from "ra-data-graphql";
import { withApollo, WithApolloClient } from "react-apollo";

import buildQuery from "../buildQuery";
import history from "../lib/history";

const styles = createStyles({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface Data {
  greeting: {
    id: string;
    email: string;
  };
}

interface AdminProps {
  theme: Theme;
  classes: {
    flex: string;
    menuButton: string;
  };
}

type Props = WithApolloClient<AdminProps>;

interface State {
  dataProvider: any;
}

export const UserList: React.FC = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="name" />
      <TextField source="role" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserEdit: React.FC = props => (
  <Edit title="User" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="email" type="email" />
      <SelectInput
        source="role"
        choices={[{ id: "user", name: "User" }, { id: "admin", name: "Admin" }]}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate: React.FC = props => (
  <Create title="User" {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <TextInput source="email" type="email" />
      <SelectInput
        source="role"
        choices={[{ id: "user", name: "User" }, { id: "admin", name: "Admin" }]}
      />
    </SimpleForm>
  </Create>
);

const authProvider = (type: any, params: any) => {
  if (type === AUTH_LOGOUT) {
    history.push("/logout");
  }
};

class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dataProvider: null
    };
  }

  componentDidMount() {
    buildGraphQLProvider({
      client: this.props.client,
      buildQuery
    }).then((dataProvider: any) => this.setState({ dataProvider }));
  }

  render() {
    const { theme } = this.props;
    const { dataProvider } = this.state;
    if (!dataProvider) {
      return <pre>Loading...</pre>;
    }
    return (
      <ReactAdmin
        authProvider={authProvider}
        theme={theme}
        title="Base Admin"
        history={history}
        dataProvider={dataProvider}
      >
        <Resource
          name="user"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
        />
      </ReactAdmin>
    );
  }
}

export default withApollo(withTheme(withStyles(styles)(Admin)));
