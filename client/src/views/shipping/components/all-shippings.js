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
} from "@material-ui/core";
import viewStyles from "../../viewStyles.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { CardBlocks } from "../../components";

const AllShippingComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  const classes = viewStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <CardBlocks title='All Shippings' nomargin>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='shipping-table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shippingState.shipping.shipping_class &&
              shippingState.shipping.shipping_class
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((shipping) => (
                  <TableRow key={shipping._id} hover>
                    <TableCell>{shipping.name}</TableCell>
                    <TableCell>{shipping.amount}</TableCell>
                    <TableCell>
                      <Tooltip title='Edit shipping' aria-label='edit'>
                        <IconButton
                          aria-label='Edit'
                          onClick={() => editShippingForm(shipping)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {!shipping.system && (
                        <Tooltip title='Delete shipping' aria-label='delete'>
                          <IconButton
                            aria-label='Delete'
                            className={classes.deleteicon}
                            onClick={() => deleteShipping(shipping._id)}
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
        component='div'
        count={shippingState.shipping.shipping_class.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </CardBlocks>
  );
};

export default AllShippingComponent;
