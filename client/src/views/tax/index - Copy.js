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

var TaxObject = {
  name: "",
  amount: ""
};
const AllTaxes = props => {
  const classes = viewStyles();
  const [editMode, setEditMode] = useState(false);
  const [taxes, setTaxes] = useState([
    { id: 1, name: "abc", amount: 10 },
    { id: 2, name: "xyz", amount: 20 },
    { id: 3, name: "dca", amount: 36 }
  ]);
  const [singleTax, setSingleTax] = useState({ name: "", amount: "" });
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
    setSingleTax({ ...singleTax, [e.target.name]: e.target.value });
  };

  const editTax = tax => {
    setEditMode(true);
    setSingleTax(tax);
  };

  const updateTax = () => {
    setEditMode(false);
    setSingleTax(TaxObject);
  };

  const addTax = () => {
    setSingleTax(TaxObject);
  };

  const cancelTax = () => {
    setEditMode(false);
    setSingleTax(TaxObject);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={6}>
          <Card>
            {taxes.loading && <Loading />}

            <CardHeader title="All Taxes" />
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
                      <TableCell>Amount</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taxes
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(tax => (
                        <TableRow key={tax.id} hover>
                          <TableCell>{tax.name}</TableCell>
                          <TableCell>{tax.amount}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit tax" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => editTax(tax)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete tax" aria-label="delete">
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
                count={taxes.length}
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
            <CardHeader title={`${editMode ? "Edit" : "Add"} Tax`} />
            <Divider />
            <CardContent>
              <TextField
                type="text"
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                value={singleTax.name}
                className={clsx(classes.marginBottom, classes.width100)}
              />
              <TextField
                type="number"
                label="Amount"
                name="amount"
                variant="outlined"
                onChange={handleChange}
                value={singleTax.amount}
                className={clsx(classes.marginBottom, classes.width100)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={editMode ? updateTax : addTax}
                variant="contained"
              >
                {editMode ? "Update" : "Add"}
              </Button>
              <Button
                size="small"
                onClick={cancelTax}
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

export default AllTaxes;
