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
import { customersAction, customerDeleteAction } from "../../store/action";
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
  addCustomerBtn: {
    background: palette.success.main,
    color: "#fff"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  avtarTd: {
    width: "50px"
  },
  container: {
    maxHeight: 440
  }
}));

const AllCustomers = props => {
  const classes = useStyles();

  useEffect(() => {
    if (isEmpty(props.customers.customers)) {
      props.customersAction();
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.customers.loading && (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" /> Loading
              </Backdrop>
            )}

            <CardHeader
              action={
                <Link to="/add-customer">
                  <Button
                    color="primary"
                    className={classes.addCustomerBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Customer
                  </Button>
                </Link>
              }
              title="All Customers"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.customers.customers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          {customer.first_name + " " + customer.last_name}
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.date}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="Edit"
                            onClick={() =>
                              jumpTo(`edit-customer/${customer.id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            className={classes.deleteicon}
                            onClick={() =>
                              props.customerDeleteAction(customer.id)
                            }
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
  return { customers: state.customers };
};

const mapDispatchToProps = {
  customersAction,
  customerDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCustomers);
