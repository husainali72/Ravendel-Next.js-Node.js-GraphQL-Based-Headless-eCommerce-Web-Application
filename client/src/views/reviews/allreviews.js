import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reviewsAction } from "../../store/action";
import { isEmpty } from "../../utils/helper.js";
import { convertDateToStringFormat } from "../utils/convertDate.js";
import theme from "../../theme";
import TableComponent from "../components/table.js";
import { get } from 'lodash'
import { ThemeProvider } from "@mui/material/styles";

const AllReviewsComponent = () => {

  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.reviews);

  const [AllReviews, setAllReviews] = useState([])
  const [tablehead, setTableHead] = useState([])

  const columndata = [{ name: "date", title: "date", sortingactive: true },
  { name: "name", title: "Customer ", sortingactive: true },
  { name: "last_modified", title: "Last Modified ", sortingactive: true },
  { name: "reviewd_product", title: "Reviewed Product", sortingactive: true },
  { name: "actions", title: "Actions", sortingactive: false }]
  useEffect(() => {
    if (!reviewState.reviews.length) {
      dispatch(reviewsAction());
    }
  }, []);


  useEffect(() => {
    if (!isEmpty(get(reviewState, 'reviews'))) {
      let data = []
      reviewState.reviews.map((review) => {

        let object = {
          id: review.id,
          date: review.date,
          name: review.customer_id.first_name + " - " + convertDateToStringFormat(review.date),
          last_modified: review.updated,
          reviewd_product: review.product_id.name
        }
        data.push(object)
      })

      setAllReviews([...data])

    }



  }, [get(reviewState, 'reviews')])

  return (
    <>
      <TableComponent
        loading={reviewState.loading}
        columns={columndata}
        rows={AllReviews}
        editpage='edit-review'

        addpage=''
        title="All Reviews"

      />

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
