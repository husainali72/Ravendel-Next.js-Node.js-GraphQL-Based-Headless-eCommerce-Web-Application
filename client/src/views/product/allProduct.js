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
  Tooltip,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsAction, productDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { Alert, Loading } from "../components";
import { client_app_route_url, bucketBaseURL } from "../../utils/helper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import theme from "../../theme/index";
const GlobalThemeOverride = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productsAction());
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
      <Alert />
      <Grid container spacing={2} className={classes.mainrow}>
        <Grid item xl={12} md={12}>
          <Card>
            {products.loading ? <Loading /> : null}
            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-product`}>
                  <Button
                    color="success"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Product
                  </Button>
                </Link>
              }
              title="All Products"
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table stickyHeader aria-label="all-products" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={classes.avtarTd}
                        variant="contained"
                        color="primary"
                      >
                        <ImageIcon />
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Name
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Date
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.container}>
                    {products.products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => (
                        <TableRow key={product.id} hover>
                          <TableCell>
                            <Avatar
                              alt={product.name}
                              src={`${bucketBaseURL}${
                                product.feature_image &&
                                product.feature_image.thumbnail
                              }`}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {convertDateToStringFormat(product.date)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Product" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={
                                  () =>
                                    navigate(
                                      `${client_app_route_url}edit-product/${product._id}`
                                    )
                                  // navigate(
                                  //   `${client_app_route_url}edit-product/${product._id}`
                                  // )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Product" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(productDeleteAction(product._id))
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
                count={products.products.length || 0}
                rowsPerPage={rowsPerPage || 10}
                page={page || 1}
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

export default function AllProduct() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalThemeOverride />
    </ThemeProvider>
  );
}
