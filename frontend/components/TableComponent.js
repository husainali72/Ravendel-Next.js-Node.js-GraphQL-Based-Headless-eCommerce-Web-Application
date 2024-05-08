import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from "prop-types";

export default function DataTable({rows, columns, ...other}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30, 50]}
        {...other}
      />
    </div>
  );
}

DataTable.propTypes = {
  rows: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};