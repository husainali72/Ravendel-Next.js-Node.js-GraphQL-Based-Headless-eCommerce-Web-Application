import React, { useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@mui/material/styles";
import { ordersAction, orderDeleteAction } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import Alerts from "../components/Alert";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import theme from "../../theme/index";

const AllOrdersComponent = () => {
  const classes = viewStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    if (isEmpty(orders.orders)) {
      dispatch(ordersAction());
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Alerts />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {orders.loading && <Loading />}

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
                      <TableCell variant="contained" color="primary">
                        Name
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Date
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Payment Status
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Shipping Status
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>
                            {order.shipping.firstname +
                              " " +
                              order.shipping.lastname}
                          </TableCell>
                          <TableCell>
                            {convertDateToStringFormat(order.date)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={"product-status-chip " + order.status}
                            >
                              {order.payment_status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={"product-status-chip " + order.status}
                            >
                              {order.shipping_status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Order" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(
                                    `${client_app_route_url}view-order/${order.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Order" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(orderDeleteAction(order.id))
                                }
                                disabled
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
                count={orders.orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default function AllOrders() {
  return (
    <ThemeProvider theme={theme}>
      <AllOrdersComponent />
    </ThemeProvider>
  );
}
