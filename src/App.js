import React from "react";

import ContentDiv from "./components/lib/ContentDiv";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import RootDiv from "./components/lib/RootDiv";

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <RootDiv>
      <ContentDiv withPaper>Hello Greenfield</ContentDiv>
    </RootDiv>
  </MuiThemeProvider>
);

export default App;
