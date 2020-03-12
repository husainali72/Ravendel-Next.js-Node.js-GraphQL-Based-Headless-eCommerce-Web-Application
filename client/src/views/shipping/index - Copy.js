import React, { Fragment, useState } from "react";
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
  TextField,
  CardActions
} from "@material-ui/core";
import Alert from "../utils/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import clsx from "clsx";

var ShippingObject = {
  name: "",
  price: ""
};
const AllShippings = props => {
  const classes = viewStyles();
  const [editMode, setEditMode] = useState(false);
  const [shippings, setShippings] = useState([
    { id: 1, name: "abc", price: 10 },
    { id: 2, name: "xyz", price: 20 },
    { id: 3, name: "dca", price: 36 }
  ]);
  const [singleShipping, setSingleShipping] = useState(ShippingObject);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = e => {
    setSingleShipping({ ...singleShipping, [e.target.name]: e.target.value });
  };

  const editShipping = shipping => {
    setEditMode(true);
    setSingleShipping(shipping);
  };

  const updateShipping = () => {
    setEditMode(false);
    setSingleShipping(ShippingObject);
  };

  const addShipping = () => {
    setSingleShipping(ShippingObject);
  };

  const cancelShipping = () => {
    setEditMode(false);
    setSingleShipping(ShippingObject);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={6}>
          <Card>
            {shippings.loading && <Loading />}

            <CardHeader title="All Shipping" />
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
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shippings
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(shipping => (
                        <TableRow key={shipping.id} hover>
                          <TableCell>{shipping.name}</TableCell>
                          <TableCell>{shipping.price}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit Shipping" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => editShipping(shipping)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete Shipping"
                              aria-label="delete"
                            >
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() => console.log("delete")}
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
                count={shippings.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <CardHeader title={`${editMode ? "Edit" : "Add"} Shipping`} />
            <Divider />
            <CardContent>
              <TextField
                type="text"
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                value={singleShipping.name}
                className={clsx(classes.marginBottom, classes.width100)}
              />
              <TextField
                type="number"
                label="Price"
                name="price"
                variant="outlined"
                onChange={handleChange}
                value={singleShipping.price}
                className={clsx(classes.marginBottom, classes.width100)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={editMode ? updateShipping : addShipping}
                variant="contained"
              >
                {editMode ? "Update" : "Add"}
              </Button>
              <Button
                size="small"
                onClick={cancelShipping}
                variant="contained"
                className={classes.cancelBtn}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllShippings;
