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
  Tooltip,
  TableSortLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../viewStyles.js";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { reviewsAction, reviewDeleteAction } from "../../store/action";
import { Loading } from "../components";
import { convertDateToStringFormat } from "../utils/convertDate";
import { client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { stableSort, getComparator } from "../components/sorting";
import { ThemeProvider } from "@mui/material/styles";
import Alerts from "../components/Alert.js";
const AllReviewsComponent = () => {
  const navigate = useNavigate();
  const classes = viewStyles();
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.reviews);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');

  useEffect(() => {
    if (!reviewState.reviews.length) {
      dispatch(reviewsAction());
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
      <Alerts />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {reviewState.loading ? <Loading /> : null}
            <CardHeader title="All Reviews" />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="reviews-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("title")
                          }}>
                            Title
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("date")
                          }}>
                            Customer
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("updated")
                          }}>
                            Last Modified
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("name")
                          }}>
                            Reviewed Product
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>

                      <TableCell sortDirection="desc" variant="contained" color="primary">
                        <Tooltip enterDelay={300} title="Sort">
                          <TableSortLabel active direction={order} onClick={() => {
                            setOrder(order === "asc" ? "desc" : "asc")
                            setOrderBy("rating")
                          }}>
                            Rating
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell variant="contained" color="primary">
                        {" "}
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {stableSort(reviewState.reviews, getComparator(order, orderBy, orderBy === "name" ? "product_id" : ""))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((review) => (
                        <TableRow key={review.id} hover>
                          <TableCell>{review.title}</TableCell>
                          <TableCell>
                            {review.customer_id.first_name} -{" "}
                            {convertDateToStringFormat(review.date)}
                          </TableCell>
                          <TableCell>

                            {convertDateToStringFormat(review.updated)}
                          </TableCell>
                          <TableCell> {review.product_id.name}</TableCell>
                          <TableCell>
                            <Rating
                              name="read-only"
                              value={Number(review.rating)}
                              readOnly
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit Review" aria-label="delete">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(
                                    `${client_app_route_url}edit-review/${review.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Review" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  dispatch(reviewDeleteAction(review.id))
                                }
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
                count={reviewState.reviews.length || 0}
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

const AllReviews = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllReviewsComponent />
    </ThemeProvider>
  );
};
export default AllReviews;
