import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ContentDiv from './lib/ContentDiv';
import RootDiv from './lib/RootDiv';

import { createStyles, withStyles } from '@material-ui/core/styles';

import history from '../lib/history';

const styles = createStyles({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface Props {
  email: string;
  classes: {
    flex: string;
    menuButton: string;
  };
}

const Home: React.FC<Props> = props => (
  <React.Fragment>
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
        <Button color="inherit" onClick={() => history.push('/logout')}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    <RootDiv>
      <ContentDiv withPaper>
        Welcome to Greenfield React App {props.email}
      </ContentDiv>
    </RootDiv>
  </React.Fragment>
);

export default withStyles(styles)(Home);
