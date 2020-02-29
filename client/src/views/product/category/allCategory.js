import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Button,
  TextField,
  CardActions,
  FormControl,
  Select
} from "@material-ui/core";
import Alert from "../../utils/Alert";
import Loading from "../../utils/loading";
import clsx from "clsx";
import { connect } from "react-redux";
import viewStyles from "../../viewStyles.js";
import {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction
} from "../../../store/action/";
import { isEmpty } from "../../../utils/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const AllCategory = props => {
  const classes = viewStyles();
  const [categories, setCategories] = useState([]);
  const [singlecategory, setSingleCategory] = useState({
    name: "",
    parentId: null
  });
  const [editMode, setEditmode] = useState(false);

  useEffect(() => {
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
  }, []);

  useEffect(() => {
    setCategories(props.products.categories);
  }, [props.products.categories]);

  const editCategory = cat => {
    setEditmode(true);
    console.log(cat);
    setSingleCategory(cat);
  };

  const handleChange = e => {
    if (e.target.name === "parentId" && !e.target.value) {
      setSingleCategory({ ...singlecategory, [e.target.name]: null });
      return;
    }
    setSingleCategory({ ...singlecategory, [e.target.name]: e.target.value });
  };

  const updateCat = () => {
    console.log("update", singlecategory);
    props.categoryUpdateAction(singlecategory);
    setEditmode(false);
    setSingleCategory({ name: "", parentId: null });
  };

  const addCat = () => {
    console.log("Add", singlecategory);
    props.categoryAddAction(singlecategory);
    setSingleCategory({ name: "", parentId: null });
    document.forms[0].reset();
  };

  const cancelCat = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleCategory({ name: "", parentId: null });
  };

  return (
    <Fragment>
      <Alert />
      {props.products.loading && <Loading />}
      <Grid container className={classes.mainrow} spacing={3}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="All Categories" />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories &&
                      categories.map(cat => (
                        <TableRow key={cat.id}>
                          <TableCell>{cat.name}</TableCell>
                          <TableCell>{cat.date}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="Edit"
                              onClick={() => editCategory(cat)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              className={classes.deleteicon}
                              onClick={() => props.categoryDeleteAction(cat.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <form>
            <Card>
              <CardHeader title={`${editMode ? "Edit" : "Add"} Category`} />
              <Divider />
              <CardContent>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.name}
                />
                <FormControl
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                >
                  <span className={classes.selectCatLabel}>Parent</span>
                  <Select
                    native
                    value={
                      singlecategory.parentId === null
                        ? ""
                        : singlecategory.parentId
                    }
                    onChange={handleChange}
                    inputProps={{
                      name: "parentId"
                    }}
                  >
                    <option value="">---Select---</option>
                    {categories &&
                      categories.map(cat => (
                        <option
                          key={cat.id}
                          value={cat.id}
                          disabled={
                            editMode && cat.id === singlecategory.id
                              ? true
                              : false
                          }
                        >
                          {cat.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateCat : addCat}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelCat}
                  variant="contained"
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
