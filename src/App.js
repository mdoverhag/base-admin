import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div>Hello Greenfield</div>
  </MuiThemeProvider>
);

export default App;
