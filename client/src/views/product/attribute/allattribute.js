import React, { Fragment, useEffect } from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attributesAction, attributeDeleteAction } from "../../../store/action";
import jumpTo from "../../../utils/navigation";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../../viewStyles";
import {
  Alert,
  Loading,
} from "../../components";

const AllAttribute = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const attributeState = useSelector((state) => state.product_attributes);
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
    dispatch(attributesAction());
  }, []);

  useEffect(() => {
    if (attributeState.render) {
      dispatch(attributesAction());
    }
  }, [attributeState.render]);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={2} className={classes.mainrow}>
        <Grid item xl={12}>
          <Card>
            {attributeState.loading ? <Loading /> : null} 
            <CardHeader
              action={
                <Link to="/add-attribute">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Attribute
                  </Button>
                </Link>
              }
              title="All Attributes"
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="all-attributes"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Values</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.container}>
                    {attributeState.attributes
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((attribute) => (
                        <TableRow key={attribute.id} hover>
                          <TableCell>{attribute.name}</TableCell>
                          <TableCell>
                            {attribute.values.map((val) => val.name).join(",")}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  jumpTo(`edit-attribute/${attribute.id}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              aria-label="delete"
                              onClick={() =>
                                dispatch(attributeDeleteAction(attribute.id))
                              }
                            >
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
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
                count={attributeState.attributes.length}
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

export default AllAttribute;
