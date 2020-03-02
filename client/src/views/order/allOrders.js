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
  Tooltip
} from "@material-ui/core";
import { connect } from "react-redux";
import { ordersAction, orderDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles";

const AllOrders = props => {
  const classes = viewStyles();

  useEffect(() => {
    if (isEmpty(props.orders.orders)) {
      props.ordersAction();
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.orders.loading && <Loading />}

            <CardHeader title="All Orders" />
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
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.orders.orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(order => (
                        <TableRow key={order.id} hover>
                          <TableCell>
                            {order.shipping.firstname +
                              " " +
                              order.shipping.lastname}
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span
                              className={"product-status-chip " + order.status}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Order" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => jumpTo(`view-order/${order.id}`)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Order" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  props.orderDeleteAction(order.id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={props.orders.orders.length}
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
  return { orders: state.orders };
};

const mapDispatchToProps = {
  ordersAction,
  orderDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
