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
  Button,
  Tooltip,
  useMediaQuery,
  TableSortLabel
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { customersAction, customerDeleteAction } from "../../store/action";
import { isEmpty } from "../../utils/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Loading } from "../components";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider, } from "@mui/material/styles";
import { stableSort, getComparator } from "../components/sorting";
import theme from "../../theme/index";
const AllCustomersComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  useEffect(() => {
    if (isEmpty(Customers.customers)) {
      dispatch(customersAction());
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <>
      <Alert />
      <Grid container spacing={isSmall ? 2 : 4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {Customers.loading && <Loading />}

            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-customer`}>
                  <Button
                    color="success"
                    className={classes.addUserBtn}
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
                <Table stickyHeader aria-label="customers-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("date")


                          }}>
                            Date
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("first_name")
                          }}>

                            Name
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>

                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("email")
                          }}>
                            Email
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>

                      <TableCell variant="contained" color="primary">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {stableSort(Customers.customers, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((customer) => (
                        <TableRow key={customer.id} hover>
                          <TableCell>
                            {convertDateToStringFormat(customer.date)}
                          </TableCell>
                          <TableCell>
                            {customer.first_name + " " + customer.last_name}
                          </TableCell>
                          <TableCell style={{ textTransform: "lowercase", }}>{customer.email}</TableCell>


                          <TableCell>
                            <Tooltip title="Edit Customer" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(
                                    `${client_app_route_url}edit-customer/${customer.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete Customer"
                              aria-label="delete"
                            >
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(customerDeleteAction(customer.id))
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
                count={Customers.customers.length || 0}
                rowsPerPage={rowsPerPage || 10}
                page={page || 0}
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

export default function AllCustomers() {
  return (
    <ThemeProvider theme={theme}>
      <AllCustomersComponent />
    </ThemeProvider>
  );
}
