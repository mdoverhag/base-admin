import React from "react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { concat } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Routes from "../components/Routes";

import { createMuiTheme } from "@material-ui/core/styles";

import history from "../lib/history";

const uri =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/api" : "/api";

const httpLink = new HttpLink({ uri });

const authMiddleware = setContext((req, { headers }) => {
  //@ts-ignore
  const userToken = window.userToken;
  if (userToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${userToken}`
      }
    };
  }
});

const errorAfterware = onError(({ graphQLErrors, networkError }) => {
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

const wares = errorAfterware.concat(authMiddleware);

const client = new ApolloClient({
  link: concat(wares, httpLink),
  cache: new InMemoryCache()
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#232f39"
    },
    secondary: {
      main: "#232f39"
    },
    background: {
      paper: "#ffffff",
      default: "#ffffff"
    }
  }
});

const App: React.FC = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
