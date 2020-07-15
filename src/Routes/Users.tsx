import React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import gql from "graphql-tag";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type Users = Array<User>;

interface UsersData {
  users: Users;
}

const GET_USERS = gql`
  {
    users {
      id
      email
      name
      role
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
}));

const Users: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery<UsersData>(GET_USERS);
  if (loading) return <span>"Loading..."</span>;
  if (error) return <span>`Error! ${error.message}`</span>;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.users.map(({ id, email, name, role }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {role}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
