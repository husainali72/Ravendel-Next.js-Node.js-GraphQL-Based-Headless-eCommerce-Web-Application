import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TablePagination,
  TableSortLabel
} from "@mui/material";
import viewStyles from "../../viewStyles.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardBlocks } from "../../components";
import theme from "../../../theme/index.js";
import { ThemeProvider, } from "@mui/material/styles";
import { stableSort, getComparator } from "../../components/sorting";
const AllShippingComponentComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  const classes = viewStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('name');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <CardBlocks title="All Shippings" nomargin>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="shipping-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc" variant="contained" color="primary">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction={order} onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc")
                    setOrderBy("name")
                  }}>
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell sortDirection="desc" variant="contained" color="primary">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction={order} onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc")
                    setOrderBy("amount")
                  }}>
                    Amount
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell variant="contained" color="primary">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  style={{marginLeft: "100px"}}>

            {shippingState.shipping.shipping_class &&
              stableSort(shippingState.shipping.shipping_class, getComparator(order, orderBy))

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((shipping) => (
                  <TableRow key={shipping._id} hover>
                    <TableCell>{shipping.name}</TableCell>
                    <TableCell style={{paddingLeft: "30px"}}>{shipping.amount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit shipping" aria-label="edit">
                        <IconButton  style={{paddingLeft: "0px"}}
                          aria-label="Edit"
                          onClick={() => editShippingForm(shipping)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {!shipping.system && (
                        <Tooltip title="Delete shipping" aria-label="delete">
                          <IconButton style={{paddingRight: "170px"}}
                            aria-label="Delete"
                            className={classes.deleteicon}
                            onClick={() => deleteShipping(shipping._id)}
                            disabled
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={shippingState.shipping.shipping_class.length || 0}
        rowsPerPage={rowsPerPage || 10}
        page={page || 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CardBlocks>
  );
};

const AllShippingComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AllShippingComponentComponent
        shippingState={shippingState}
        editShippingForm={editShippingForm}
        deleteShipping={deleteShipping}
      />
    </ThemeProvider>
  );
};
export default AllShippingComponent;
