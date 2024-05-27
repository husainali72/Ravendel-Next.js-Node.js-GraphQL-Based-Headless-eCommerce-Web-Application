import React, { useState } from "react";
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

export default function DataTable({ rows = [], columns = [] }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const setting = useSelector((state) => state.setting);
  const handleSort = (field) => {
    if (sortColumn === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortDirection("asc");
    }
  };

  const handleMouseEnter = (field) => {
    setHoveredColumn(field);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
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
          {rows && rows?.length >0 ? (
            rows
              ?.slice()
              ?.sort((a, b) =>
                sortDirection === "asc"
                  ? a[sortColumn] > b[sortColumn]
                    ? 1
                    : -1
                  : a[sortColumn] < b[sortColumn]
                  ? 1
                  : -1
              )
              ?.map((row) => (
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
    </TableContainer>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleShowDetailsPopup: PropTypes.func.isRequired,
};
