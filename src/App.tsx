import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ApolloClient from "apollo-boost";

import Routes from "./Routes";

import { createMuiTheme } from "@material-ui/core/styles";

import history from "./lib/history";

const uri =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/api" : "/api";

const client = new ApolloClient({
  uri,
  request: (operation) => {
    //@ts-ignore
    const userToken = window.userToken;
    operation.setContext({
      headers: {
        authorization: userToken ? `Bearer ${userToken}` : "",
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
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
  },
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#dfcf99",
    },
    secondary: {
      //main: "#a38d6d"
      main: "#333333",
    },
    background: {
      paper: "#333333",
      default: "#212121",
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
