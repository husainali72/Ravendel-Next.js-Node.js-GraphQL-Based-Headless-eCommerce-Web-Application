import React, { Fragment, useEffect, useState } from "react";
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
  TablePagination,
  TableContainer,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pagesAction, pageDeleteAction } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { Alert, Loading } from "../components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../theme/index";
const AllPagesComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pages);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(pageState.pages)) {
      dispatch(pagesAction());
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {pageState.loading ? <Loading /> : null}

            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-page`}>
                  <Button
                    color="success"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add New Page
                  </Button>
                </Link>
              }
              title="All Pages"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="pages-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="contained" color="primary">
                        Title
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Status
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Created
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageState.pages
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((page) => (
                        <TableRow key={page.id} hover>
                          <TableCell>{page.title}</TableCell>
                          <TableCell>{page.status}</TableCell>
                          <TableCell>
                            {convertDateToStringFormat(page.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Page" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(
                                    `${client_app_route_url}edit-page/${page.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Page" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(pageDeleteAction(page.id))
                                }
                                disabled
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
                count={pageState.pages.length || 0}
                rowsPerPage={rowsPerPage || 10}
                page={page || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default function AllPages() {
  return (
    <ThemeProvider theme={theme}>
      <AllPagesComponent />
    </ThemeProvider>
  );
}
