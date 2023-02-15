import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  TextField,
  Tooltip,
  TablePagination,
  Box,
  TableSortLabel
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import viewStyles from "../viewStyles.js";
import {
  blogtagAddAction,
  blogtagUpdateAction,
  blogtagDeleteAction,
} from "../../store/action/";
import { isEmpty } from "../../utils/helper.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { convertDateToStringFormat } from "../utils/convertDate";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { stableSort, getComparator } from "../components/sorting";
import {
  Alert,
  Loading,
  CardBlocks,
  CardBlocksWithAction,
} from "../components";
import { blogtagsAction } from "../../store/action/";
var tagObject = {
  name: "",
  url: "",
};
const AllTagsComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [singleTag, setSingleTag] = useState(tagObject);
  const [editMode, setEditmode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(blogtagsAction());
  }, []);

  const editTag = (tag) => {
    setEditmode(true);
    setSingleTag({ ...singleTag, ...tag });
  };

  const handleChange = (e) => {
    setSingleTag({ ...singleTag, [e.target.name]: e.target.value });
  };

  const updateTag = () => {
    var errors = validate(["url", "name"], singleTag);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(blogtagUpdateAction(singleTag));
      setEditmode(false);
      setSingleTag(tagObject);
    }

  };

  const addTag = () => {
    var errors = validate(["url", "name"], singleTag);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(blogtagAddAction(singleTag));
      setSingleTag(tagObject);
    }

  };

  const cancelTag = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleTag(tagObject);
  };

  return (
    <>
      <Alert />
      {blogState.loading ? <Loading /> : null}
      <Grid container className={classes.mainrow} spacing={2}>
        <Grid item md={6} xs={12}>
          <CardBlocks title="All Tags" nomargin>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="Tags-table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sortDirection="desc" variant="contained" color="primary">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction={order} onClick={() => {
                          setOrder(order === "asc" ? "desc" : "asc")
                          setOrderBy("date")
                        }}>
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell sortDirection="desc" variant="contained" color="primary">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction={order} onClick={() => {
                          setOrder(order === "asc" ? "desc" : "asc")
                          setOrderBy("name")
                        }}>
                          Name
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>


                    <TableCell variant="contained" color="primary" style={{paddingLeft: "20px"}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(blogState.tags, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tag) => (
                      <TableRow key={tag.id} hover>
                        <TableCell>
                          {convertDateToStringFormat(tag.date)}
                        </TableCell>
                        <TableCell>{tag.name}</TableCell>

                        <TableCell>
                          <Tooltip title="Edit Tag" aria-label="edit">
                            <IconButton
                              aria-label="Edit"
                              onClick={() => editTag(tag)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Tag" aria-label="delete">
                            <IconButton
                              aria-label="Delete"
                              className={classes.deleteicon}
                              onClick={() =>
                                dispatch(blogtagDeleteAction(tag.id))
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
              count={blogState.tags.length || 0}
              rowsPerPage={rowsPerPage || 10}
              page={page || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardBlocks>
        </Grid>

        <Grid item md={6} xs={12}>
          <form>
            <CardBlocksWithAction
              title={`${editMode ? "Edit" : "Add"} Tag`}
              successBtnLable={editMode ? "Update" : "Add"}
              successBtnOnChange={editMode ? updateTag : addTag}
              cancelBtnOnChange={cancelTag}
              nomargin
            >
              <Box component="div" mb={2}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  onChange={handleChange}
                  value={singleTag.name}
                  fullWidth
                />
              </Box>
              <Box component="div" mb={2}>
                <TextField
                  label="Url"
                  name="url"
                  variant="outlined"
                  onChange={handleChange}
                  value={singleTag.url}
                  fullWidth
                />
              </Box>
            </CardBlocksWithAction>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const AllTags = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllTagsComponent />
    </ThemeProvider>
  );
};
export default AllTags;
