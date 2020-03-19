import React, { Fragment, useState } from "react";
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
import Alert from "../utils/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import jumpTo from "../../utils/navigation";
import Rating from "@material-ui/lab/Rating";

var Reviews = [
  {
    id: 1,
    title: "Lisa M. Golay",
    reviwed_product: "Product Second",
    rating: 2,
    date: "14/2/2018"
  },
  {
    id: 2,
    title: "Andrew",
    reviwed_product: "Product Fourth",
    rating: 5,
    date: "20/6/2019"
  },
  {
    id: 3,
    title: "Village of Nayak",
    reviwed_product: "Product First",
    rating: 4,
    date: "21/12/2018"
  },
  {
    id: 4,
    title: "Real Properties",
    reviwed_product: "Product Last",
    rating: 1,
    date: "31/1/2020"
  }
];

const AllReviews = props => {
  const classes = viewStyles();
  const [allReviews, setAllReviews] = useState(Reviews);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.loading && <Loading />}

            <CardHeader title="All Reviews" />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="all reviews table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Last Modified</TableCell>
                      <TableCell>Reviewed Product</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allReviews
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(review => (
                        <TableRow key={review.id} hover>
                          <TableCell>{review.id}</TableCell>
                          <TableCell>
                            {review.title} - {review.date}
                          </TableCell>
                          <TableCell>3/18/2020</TableCell>
                          <TableCell>{review.reviwed_product}</TableCell>
                          <TableCell>
                            <Rating
                              name="read-only"
                              value={review.rating}
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
                                onClick={() => console.log(review.id)}
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
                count={allReviews.length}
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

export default AllReviews;
