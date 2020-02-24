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
import palette from "../../theme/palette";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  mainrow: {
    padding: theme.spacing(4)
  },
  deleteicon: {
    color: palette.error.dark
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "100%"
  },
  addUserBtn: {
    background: palette.success.main,
    color: "#fff"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  avtarTd:{
      width: '50px'
  },
  container: {
    maxHeight: 440,
  },
}));

const AllUsers = props => {
  const classes = useStyles();

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
              <Table>
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
                  {props.users.users.map(user => (
                    <TableRow key={user.id}>
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
