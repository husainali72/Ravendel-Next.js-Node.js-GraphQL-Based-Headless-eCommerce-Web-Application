import React, { Fragment, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  IconButton,
  Avatar,
  Button,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { usersAction, userDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";

const AllUsers = props => {
  const classes = viewStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isEmpty(props.users.users)) {
      props.usersAction();
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.users.loading && (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" /> Loading
              </Backdrop>
            )}

            <CardHeader
              action={
                <Link to="/add-user">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add User
                  </Button>
                </Link>
              }
              title="All Users"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  aria-label="sticky table and Dense Table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.avtarTd}>
                        <PeopleIcon />
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.users.users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(user => (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Avatar
                              alt={user.name}
                              src={user.image && user.image.thumbnail}
                            />
                          </TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="Edit"
                              onClick={() => jumpTo(`edit-user/${user.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              className={classes.deleteicon}
                              onClick={() => props.userDeleteAction(user.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={props.users.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = {
  usersAction,
  userDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
