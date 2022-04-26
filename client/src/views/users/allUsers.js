import React, { Fragment, useEffect, useState } from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersAction, userDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import { Alert, Loading } from "../components";
import { client_app_route_url } from "../../utils/helper";

const AllUsers = () => {
  const classes = viewStyles();
  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isEmpty(UsersState.users)) {
      dispatch(usersAction());
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      {UsersState.loading ? <Loading /> : null}
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-user`}>
                  <Button
                    color='primary'
                    className={classes.addUserBtn}
                    size='small'
                    variant='contained'
                  >
                    Add User
                  </Button>
                </Link>
              }
              title='All Users'
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label='users-table' size='small'>
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
                    {UsersState.users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
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
                              aria-label='Edit'
                              onClick={() => jumpTo(`${client_app_route_url}edit-user/${user.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label='Delete'
                              className={classes.deleteicon}
                              onClick={() =>
                                dispatch(userDeleteAction(user.id))
                              }
                              disabled
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
                component='div'
                count={UsersState.users.length}
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

export default AllUsers;
