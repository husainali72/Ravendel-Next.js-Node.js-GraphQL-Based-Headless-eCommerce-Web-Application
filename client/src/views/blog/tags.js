import React, { Fragment, useState, useEffect } from "react";
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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import viewStyles from "../viewStyles.js";
import {
  blogtagsAction,
  blogtagAddAction,
  blogtagUpdateAction,
  blogtagDeleteAction,
} from "../../store/action/";
import { isEmpty } from "../../utils/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { convertDateToStringFormat } from "../utils/convertDate";
import {
  Alert,
  Loading,
  CardBlocks,
  CardBlocksWithAction,
} from "../components";

var tagObject = {
  name: "",
  url: "",
};
const AllTags = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [singleTag, setSingleTag] = useState(tagObject);
  const [editMode, setEditmode] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isEmpty(blogState.tags)) {
      dispatch(blogtagsAction());
    }
  }, [blogState.tags]);

  const editTag = (tag) => {
    setEditmode(true);
    setSingleTag({ ...singleTag, ...tag });
  };

  const handleChange = (e) => {
    setSingleTag({ ...singleTag, [e.target.name]: e.target.value });
  };

  const updateTag = () => {
    dispatch(blogtagUpdateAction(singleTag));
    setEditmode(false);
    setSingleTag(tagObject);
  };

  const addTag = () => {
    dispatch(blogtagAddAction(singleTag));
    setSingleTag(tagObject);
  };

  const cancelTag = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleTag(tagObject);
  };

  return (
    <Fragment>
      <Alert />
      {blogState.loading ? <Loading /> : null}
      <Grid container className={classes.mainrow} spacing={2}>
        <Grid item md={6} xs={12}>
          <CardBlocks title='All Tags' nomargin>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label='Tags-table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogState.tags
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tag) => (
                      <TableRow key={tag.id} hover>
                        <TableCell>{tag.name}</TableCell>
                        <TableCell>
                          {convertDateToStringFormat(tag.date)}
                        </TableCell>
                        <TableCell>
                          <Tooltip title='Edit Tag' aria-label='edit'>
                            <IconButton
                              aria-label='Edit'
                              onClick={() => editTag(tag)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Delete Tag' aria-label='delete'>
                            <IconButton
                              aria-label='Delete'
                              className={classes.deleteicon}
                              onClick={() =>
                                dispatch(blogtagDeleteAction(tag.id))
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
              component='div'
              count={blogState.tags.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
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
              <Box component='div' mb={2}>
                <TextField
                  label='Name'
                  name='name'
                  variant='outlined'
                  onChange={handleChange}
                  value={singleTag.name}
                  fullWidth
                />
              </Box>
              <Box component='div' mb={2}>
                <TextField
                  label='Url'
                  name='url'
                  variant='outlined'
                  onChange={handleChange}
                  value={singleTag.url}
                  fullWidth
                />
              </Box>
            </CardBlocksWithAction>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllTags;
