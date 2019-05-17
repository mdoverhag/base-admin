import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#232f39'
    },
    secondary: {
      main: '#e99139'
    }
  }
});

const App: React.FC = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Routes />
  </MuiThemeProvider>
);

export default App;
