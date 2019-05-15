import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ContentDiv from "./components/lib/ContentDiv";
import RootDiv from "./components/lib/RootDiv";

import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#232f39"
    },
    secondary: {
      main: "#e99139"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={props.classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={props.classes.flex}>
          Greenfield React App
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
    <RootDiv>
      <ContentDiv withPaper>Hello Greenfield</ContentDiv>
    </RootDiv>
  </MuiThemeProvider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
