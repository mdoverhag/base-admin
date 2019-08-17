import React from "react";

import {
  AUTH_LOGOUT,
  Admin as ReactAdmin,
  Datagrid,
  List,
  Resource,
  TextField
} from "react-admin";

import gql from "graphql-tag";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, withStyles, withTheme } from "@material-ui/core/styles";
import buildGraphQLProvider from "ra-data-graphql";
import { withApollo, WithApolloClient } from "react-apollo";

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
      <TextField source="email" />
      <TextField source="role" />
    </Datagrid>
  </List>
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
      buildQuery: (introspectionResults: any, options: any) => (
        raFetchType: any,
        resourceName: any,
        params: any
      ) => {
        console.log(this.props.client);
        console.log(introspectionResults);
        console.log(options);
        console.log(raFetchType);
        console.log(resourceName);
        console.log(params);
        return {
          query: gql`
            {
              users {
                id
                email
                role
              }
            }
          `,
          variables: params,
          parseResponse: (response: any) => ({
            data: response.data.users,
            total: response.data.users.length
          })
        };
      }
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
        <Resource name="user" list={UserList} />
      </ReactAdmin>
    );
  }
}

export default withApollo(withTheme(withStyles(styles)(Admin)));
