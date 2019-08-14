import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";

import ContentDiv from "./lib/ContentDiv";
import RootDiv from "./lib/RootDiv";

import { gql } from "apollo-boost";
import { createStyles, withStyles } from "@material-ui/core/styles";

import history from "../lib/history";

const styles = createStyles({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface Data {
  greeting: {
    id: string;
    email: string;
  };
}

const GREETING = gql`
  {
    greeting {
      id
      email
    }
  }
`;

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
          Base Admin
        </Typography>
        <Button color="inherit" onClick={() => history.push("/logout")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    <RootDiv>
      <ContentDiv withPaper>Welcome to Base Admin {props.email}</ContentDiv>
      <ContentDiv withPaper>
        <Query<Data> query={GREETING}>
          {({ loading, error, data }) => {
            if (loading) return <pre>Loading...</pre>;
            if (error) return <pre>{JSON.stringify(error)}</pre>;
            return <pre>{JSON.stringify(data)}</pre>;
          }}
        </Query>
      </ContentDiv>
    </RootDiv>
  </React.Fragment>
);

export default withStyles(styles)(Home);
