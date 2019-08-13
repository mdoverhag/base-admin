import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import Routes from "../containers/Routes";

import { createMuiTheme } from "@material-ui/core/styles";

import store from "../store";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://base-server.mdoverhag.com/api";

const client = new ApolloClient({
  uri,
  fetchOptions: {
    credentials: "include"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#232f39"
    },
    secondary: {
      main: "#e99139"
    }
  }
});

const App: React.FC = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
