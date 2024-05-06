import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reviewDeleteAction, reviewsAction } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper.js";
import { convertDateToStringFormat } from "../utils/convertDate.js";
import theme from "../../theme";
import { Grid } from "@mui/material";
import TableComponent from "../components/table.js";
import { get } from "lodash";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/actionbutton";
import viewStyles from "../viewStyles";
const AllReviewsComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewState = useSelector((state) => state.reviews);
  const settings = useSelector((state) => state.settings);
  const [AllReviews, setAllReviews] = useState([]);
  const [filtered, setfilterdData] = useState([]);
  const columndata = [
    {
      name: "date",
      type: "date",
      title: "date",
      sortingactive: true,
    },
    {
      name: "name",
      type: "text",
      title: "Customer ",
      sortingactive: true,
    },
    {
      name: "last_modified",
      type: "date",
      title: "Last Modified ",
      sortingactive: true,
    },
    {
      name: "reviewd_product",
      type: "date",
      title: "Reviewed Product",
      sortingactive: true,
    },
    {
      name: "rating",
      type: "rating",
      title: "Ratings",
      sortingactive: true,
    },
    {
      name: "actions",
      type: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === "edit") {
          navigate(`${client_app_route_url}edit-review/${id}`);
        } else if (type === "delete") {
          dispatch(reviewDeleteAction(id));
        }
      },
    },
  ];
  useEffect(() => {
    if (!reviewState.reviews.length) {
      dispatch(reviewsAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(reviewState, "reviews"))) {
      let data = [];
      reviewState.reviews.map((review) => {
        const { id, date, updated, rating } = review;
        let object = {
          id,
          date,
          name:
            review.customerId.firstName +
            " - " +
            convertDateToStringFormat(date,settings),
          last_modified: convertDateToStringFormat(updated,settings),
          reviewd_product: review.productId.name,
          rating: rating,
        };
        data.push(object);
      });
      setAllReviews(data);
      setfilterdData(data);
    } else {
      setAllReviews([]);
      setfilterdData([]);
    }
  }, [get(reviewState, "reviews")]);
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData);
  };
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12}>
          <TableComponent
            loading={reviewState.loading}
            columns={columndata}
            rows={filtered}
            searchdata={AllReviews}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage=""
            title="All Reviews"
            showDeleteButton={true}
            searchbydate={true}
          />
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
