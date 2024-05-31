import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "lodash";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { convertDateToStringFormat } from "../utills/helpers";
import { useSelector } from "react-redux";
import CustomBadge from "./badge";
import CustomPagination from "./tablePagination";

export default function DataTable({
  rows = [],
  columns = [],
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortedRows, setSortedRows] = useState([...rows]);
  const setting = useSelector((state) => state.setting);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleSort = (field) => {
    const newSortDirection = sortColumn === field && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(field);
    setSortDirection(newSortDirection);
  };

  const handleMouseEnter = (field) => {
    setHoveredColumn(field);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  useEffect(() => {
    const sorted = [...rows].sort((a, b) => {
      if (!sortColumn) return 0;
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
    setSortedRows(sorted);
  }, [rows, sortColumn, sortDirection]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedRows.slice(startIndex, endIndex);
  };

  const renderCellContent = (column, row) => {
    switch (column.type) {
      case "action":
        return column.renderCell({ column, row });
      case "date":
        return convertDateToStringFormat(get(row, column.field, ""), setting);
      case "badge":
        return (
          <CustomBadge
            badgeContent={get(row, column.field, "")}
            badgeColor={get(row, column.field, "")}
          />
        );
      default:
        return get(row, column.field, "");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column?.field}
                style={{ minWidth: column?.minWidth, flex: column?.flex }}
                onClick={() => column.sortable && handleSort(column.field)}
                onMouseEnter={() => handleMouseEnter(column.field)}
                onMouseLeave={handleMouseLeave}
              >
                {column?.headerName || ""}
                {column?.sortable && hoveredColumn === column.field && (
                  <span>
                    {sortDirection === "asc" ? (
                      <ArrowUpwardIcon className="sorting-icon" />
                    ) : (
                      <ArrowDownwardIcon className="sorting-icon" />
                    )}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows?.length > 0 ? (
            getPaginatedData().map((row) => (
              <TableRow key={row.id}>
                {columns?.map((column) => (
                  <TableCell key={column?.field}>
                    {renderCellContent(column, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="pagination-container">
        <div className="rows-per-page-selector">
          Rows per page:
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {rowsPerPageOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </TableContainer>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultRowsPerPage: PropTypes.number,
};

DataTable.defaultProps = {
  defaultRowsPerPage: 5,
};
