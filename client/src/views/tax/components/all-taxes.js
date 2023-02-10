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
  TableSortLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../../viewStyles";
import { CardBlocks } from "../../components";
import theme from "../../../theme";
import { stableSort, getComparator } from "../../components/sorting";
import { ThemeProvider } from "@mui/material/styles";
const AllTaxesComponents = ({ taxState, editTaxChange, deleteTaxChange }) => {
  const classes = viewStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <CardBlocks title="All Taxes" nomargin>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="tax-table" size="small">
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
              <TableCell sortDirection="desc" variant="contained" color="primary" >
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction={order} onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc")
                    setOrderBy("percentage")
                  }}>
                    Percentage
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell variant="contained" color="primary">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxState.tax.tax_class &&

              stableSort(taxState.tax.tax_class, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tax) => (
                  <TableRow key={tax._id} hover>
                    <TableCell>{tax.name}</TableCell>
                    <TableCell>{tax.percentage}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit tax" aria-label="edit">
                        <IconButton
                          aria-label="Edit"
                          onClick={() => editTaxChange(tax)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {!tax.system && (
                        <Tooltip title="Delete tax" aria-label="delete">
                          <IconButton
                            aria-label="Delete"
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
        component="div"
        count={taxState.tax.tax_class.length || 0}
        rowsPerPage={rowsPerPage || 10}
        page={page || 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CardBlocks>
  );
};

const AllTaxesComponent = ({ taxState, editTaxChange, deleteTaxChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <AllTaxesComponents
        taxState={taxState}
        editTaxChange={editTaxChange}
        deleteTaxChange={deleteTaxChange}
      />
    </ThemeProvider>
  );
};
export default AllTaxesComponent;
