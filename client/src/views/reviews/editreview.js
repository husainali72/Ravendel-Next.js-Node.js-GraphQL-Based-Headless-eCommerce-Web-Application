import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Typography,
  Button,
  TextField,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@material-ui/core";
import Alert from "../utils/Alert";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { productsAction, customersAction } from "../../store/action";
import { connect } from "react-redux";

const StyledRadio = props => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};
const EditReview = props => {
  const classes = viewStyles();
  const [ratignVal, setRatinVal] = useState(3);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.customers.customers)) {
      props.customersAction();
    }
  }, []);

  const updateReview = () => {
    console.log("update Review");
  };

  const handleChange = () => {};

  return (
    <Fragment>
      <Alert />
      {props.loading && <Loading />}
      <Grid container className="topbar">
        <Grid item lg={6}>
          <Typography variant="h4">
            <Link to="/all-pages">
              <IconButton aria-label="Back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <span style={{ paddingTop: 10 }}>Edit Customer Review</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={updateReview}>
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.cancelBtn}
          >
            <Link to="/all-pages" style={{ color: "#fff" }}>
              Discard
            </Link>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Grid item lg={9} md={12}>
          <Box>
            <Card>
              <CardHeader title="Review Information" />
              <Divider />
              <CardContent>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Title"
                  className={clsx(classes.marginBottom, classes.width100)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Review"
                  className={clsx(classes.marginBottom, classes.width100)}
                  multiline
                  rows="5"
                />
              </CardContent>
            </Card>
          </Box>

          <Box mt={2}>
            <Card>
              <CardHeader title="Review Details" />
              <Divider />
              <CardContent>
                <Autocomplete
                  id="combo-box-demo"
                  options={props.products.products}
                  getOptionLabel={option => option.name}
                  className={clsx(classes.marginBottom)}
                  onChange={(event, value) => console.log(value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Reviewed Products"
                    />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={props.customers.customers}
                  getOptionLabel={option => option.first_name}
                  className={clsx(classes.marginBottom)}
                  onChange={(event, value) => console.log(value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Reviewer Name"
                    />
                  )}
                />
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email Address"
                  className={clsx(classes.marginBottom, classes.width100)}
                />
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratignVal}
                    onChange={(event, newValue) => {
                      setRatinVal(newValue);
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item lg={3} md={12}>
          <Card>
            <CardHeader title="Status" />
            <Divider />
            <CardContent>
              <RadioGroup
                defaultValue="Publish"
                name="status"
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="Publish"
                  control={<StyledRadio />}
                  label="Publish"
                />
                <FormControlLabel
                  value="Pending"
                  control={<StyledRadio />}
                  label="Pending"
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.products, customers: state.customers };
};

const mapDispatchToProps = {
  productsAction,
  customersAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
