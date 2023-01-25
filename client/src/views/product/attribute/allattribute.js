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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attributeDeleteAction, attributesAction } from "../../../store/action";
import jumpTo from "../../../utils/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../../viewStyles";
import { Alert, Loading } from "../../components";
import { client_app_route_url } from "../../../utils/helper";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const AllAttributeComponent = () => {
  const navigate = useNavigate();
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
    <>
      <Alert />
      <Grid container spacing={2} className={classes.mainrow}>
        <Grid item xl={12}>
          <Card>
            {attributeState.loading ? <Loading /> : null}
            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-attribute`}>
                  <Button
                    color="success"
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
                <Table stickyHeader aria-label="all-attributes" size="small">
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
                                  navigate(
                                    `${client_app_route_url}edit-attribute/${attribute.id}`
                                  )
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
                              disabled
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

const AllAttribute = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllAttributeComponent />
    </ThemeProvider>
  );
};
export default AllAttribute;
