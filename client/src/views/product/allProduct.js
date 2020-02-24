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
  IconButton,
  Avatar,
  Button,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { productsAction, productDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import palette from "../../theme/palette";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  mainrow: {
    padding: theme.spacing(4)
  },
  deleteicon: {
    color: palette.error.dark
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "100%"
  },
  addUserBtn: {
    background: palette.success.main,
    color: "#fff"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  avtarTd: {
    width: "50px"
  },
  container: {
    maxHeight: 440
  }
}));

const AllProduct = props => {
  const classes = useStyles();

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.products.loading && (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" /> Loading
              </Backdrop>
            )}

            <CardHeader
              action={
                <Link to="/add-product">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Product
                  </Button>
                </Link>
              }
              title="All Blogs"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.avtarTd}>
                        <PeopleIcon />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.products.products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Avatar
                            alt={product.name}
                            src={
                              product.feature_image &&
                              product.feature_image.thumbnail
                            }
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.date}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => jumpTo(`edit-product/${product.id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            className={classes.deleteicon}
                            onClick={() =>
                              props.productDeleteAction(product.id)
                            }
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
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = {
  productsAction,
  productDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);
