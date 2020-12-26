import React from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

import history from "lib/history";
import { useListUsers } from "lib/queries";

const useStyles = makeStyles({
  title: {
    flex: "1 1 100%",
  },
  tableRow: {
    cursor: "pointer",
  },
});

const ListUsers: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useListUsers();
  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;
  return (
    <TableContainer component={Paper}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Users
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => history.push("/users/create")}
        >
          Create
        </Button>
      </Toolbar>
      <Table>
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
            data.list_users.map(({ id, email, name, role }) => (
              <TableRow
                key={id}
                hover
                className={classes.tableRow}
                onClick={() => history.push(`/users/${id}`)}
              >
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

export default ListUsers;
