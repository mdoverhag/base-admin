import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MaterialLink from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";

import GenericDrawer from "components/Navigator/GenericDrawer";

import history from "lib/history";
import { useIsMobileSize } from "lib/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    drawerContainer: {
      overflow: "auto",
      marginTop: theme.spacing(2),
    },
    spacer: {
      flexGrow: 1,
    },
    versionContainer: {
      marginBottom: theme.spacing(1),
    },
    versionDivider: {
      margin: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    main: {
      flexGrow: 1,
    },
    contentMobile: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  })
);

const Navigator: React.FC = ({ children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const isMobileSize = useIsMobileSize();
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="secondary" position="fixed">
        <Toolbar variant="dense">
          {isMobileSize && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Base Admin
          </Typography>
          <Button color="inherit" onClick={() => history.push("/logout")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <GenericDrawer
        mobileDrawerOpen={mobileDrawerOpen}
        setMobileDrawerOpen={setMobileDrawerOpen}
      >
        {!isMobileSize && <Toolbar variant="dense" />}
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="User Accounts" />
            </ListItem>
          </List>
        </div>
        <div className={classes.spacer}></div>
        <Grid container direction="row" justify="center" alignItems="flex-end">
          <div className={classes.versionContainer}>
            <MaterialLink href="#" onClick={preventDefault}>
              {process.env.REACT_APP_VERSION}
            </MaterialLink>
          </div>
          <div className={classes.versionDivider}>
            <Typography variant="body2">/</Typography>
          </div>
          <div className={classes.versionContainer}>
            <MaterialLink href="#" onClick={preventDefault}>
              v0.1.12
            </MaterialLink>
          </div>
        </Grid>
      </GenericDrawer>
      <main className={classes.main}>
        <Toolbar variant="dense" />
        <div className={isMobileSize ? classes.contentMobile : classes.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Navigator;
