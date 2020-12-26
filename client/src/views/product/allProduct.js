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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsAction, productDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { Alert, Loading } from "../components";

const AllProduct = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
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
    <Fragment>
      <Alert />
      <Grid container spacing={2} className={classes.mainrow}>
        <Grid item xl={12}>
          <Card>
            {products.loading ? <Loading /> : null}
            <CardHeader
              action={
                <Link to='/add-product'>
                  <Button
                    color='primary'
                    className={classes.addUserBtn}
                    size='small'
                    variant='contained'
                  >
                    Add Product
                  </Button>
                </Link>
              }
              title='All Products'
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table stickyHeader aria-label='all-products' size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.avtarTd}>
                        <ImageIcon />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
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
                              src={
                                product.feature_image &&
                                product.feature_image.thumbnail
                              }
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {convertDateToStringFormat(product.date)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title='Edit Product' aria-label='edit'>
                              <IconButton
                                aria-label='Edit'
                                onClick={() =>
                                  jumpTo(`edit-product/${product.id}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete Product' aria-label='delete'>
                              <IconButton
                                aria-label='Delete'
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(productDeleteAction(product.id))
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
                component='div'
                count={products.products.length}
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

export default AllProduct;
