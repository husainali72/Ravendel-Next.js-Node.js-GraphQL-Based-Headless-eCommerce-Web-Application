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
  Tooltip
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import jumpTo from "../../utils/navigation";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
import { reviewsAction, reviewDeleteAction } from "../../store/action";

const AllReviews = props => {
  const classes = viewStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!props.reviewState.reviews.length) {
      props.reviewsAction();
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.reviewState.loading && <Loading />}

            <CardHeader title="All Reviews" />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="all reviews table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Last Modified</TableCell>
                      <TableCell>Reviewed Product</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.reviewState.reviews
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(review => (
                        <TableRow key={review.id} hover>
                          <TableCell>
                            {review.title} - {review.date}
                          </TableCell>
                          <TableCell>{review.update}</TableCell>
                          <TableCell>need to assign</TableCell>
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
                                  jumpTo(`edit-review/${review.id}`)
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
                                  props.reviewDeleteAction(review.id)
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
                count={props.reviewState.reviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return { reviewState: state.reviews };
};

const mapDispatchToProps = {
  reviewsAction,
  reviewDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);
