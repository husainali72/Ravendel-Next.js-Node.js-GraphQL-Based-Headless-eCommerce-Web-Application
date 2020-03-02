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
  Tooltip
} from "@material-ui/core";
import Alert from "../utils/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import jumpTo from "../../utils/navigation";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";

const AllBrands = props => {
  const classes = viewStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [brands, setBrands] = useState([
    { id: 1, name: "abc", products: 10 },
    { id: 2, name: "xyz", products: 20 },
    { id: 3, name: "dca", products: 36 }
  ]);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {brands.loading && <Loading />}

            <CardHeader
              action={
                <Link to="/add-brand">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add New Brand
                  </Button>
                </Link>
              }
              title="All Brands"
            />
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
                      <TableCell>Brand Name</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brands
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(brand => (
                        <TableRow key={brand.id} hover>
                          <TableCell>{brand.name}</TableCell>
                          <TableCell>{brand.products}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit Brand" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => jumpTo(`edit-brand/${brand.id}`)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Brand" aria-label="delete">
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
                count={brands.length}
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

export default AllBrands;
