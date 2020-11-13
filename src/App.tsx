import React from "react";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Routes from "Routes";

import { createMuiTheme } from "@material-ui/core/styles";

import history from "lib/history";

const uri =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/api" : "/api";

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  //@ts-ignore
  const userToken = window.userToken;
  return {
    headers: {
      authorization: userToken ? `Bearer ${userToken}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "unauthorized") {
        history.push("/logout");
      }
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#232f39",
    },
    secondary: {
      main: "#232f39",
    },
    background: {
      paper: "#ffffff",
    },
  },
});

const App: React.FC = (props) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
