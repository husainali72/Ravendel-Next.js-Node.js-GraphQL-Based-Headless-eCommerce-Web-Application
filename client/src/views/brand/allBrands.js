import React, { Fragment, useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import viewStyles from "../viewStyles.js";
import { isEmpty } from "../../utils/helper";
import { brandsAction, brandDeleteAction } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Alert } from "../components";
import { convertDateToStringFormat } from "../utils/convertDate";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
const AllbrandComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Brands = useSelector((state) => state.brands);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (isEmpty(Brands.brands)) {
      // dispatch(brandsAction());
    }
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Alert />
      <Grid container spacing={isSmall ? 2 : 4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {Brands.loading && <Loading />}

            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-brand`}>
                  <Button
                    color="success"
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
                <Table stickyHeader aria-label="brands-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="contained" color="primary">
                        Brand Name
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Date
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Brands.brands
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((brand) => (
                        <TableRow key={brand.id} hover>
                          <TableCell>{brand.name}</TableCell>
                          <TableCell>
                            {convertDateToStringFormat(brand.date)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Brand" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(
                                    `${client_app_route_url}edit-brand/${brand.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Brand" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(brandDeleteAction(brand.id))
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
                count={Brands.brands.length || 0}
                rowsPerPage={rowsPerPage || 10}
                page={page || 1}
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

export default function AllBrands() {
  return (
    <ThemeProvider theme={theme}>
      <AllbrandComponent />
    </ThemeProvider>
  );
}
