import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../../viewStyles";
import { CardBlocks } from "../../components";

const AllTaxesComponent = ({ taxState, editTaxChange, deleteTaxChange }) => {
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
    <CardBlocks title='All Taxes' nomargin>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='tax-table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxState.tax.tax_class &&
              taxState.tax.tax_class
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tax) => (
                  <TableRow key={tax._id} hover>
                    <TableCell>{tax.name}</TableCell>
                    <TableCell>{tax.percentage}</TableCell>
                    <TableCell>
                      <Tooltip title='Edit tax' aria-label='edit'>
                        <IconButton
                          aria-label='Edit'
                          onClick={() => editTaxChange(tax)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {!tax.system && (
                        <Tooltip title='Delete tax' aria-label='delete'>
                          <IconButton
                            aria-label='Delete'
                            className={classes.deleteicon}
                            onClick={() => deleteTaxChange(tax._id)}
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
        component='div'
        count={taxState.tax.tax_class.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </CardBlocks>
  );
};

export default AllTaxesComponent;
