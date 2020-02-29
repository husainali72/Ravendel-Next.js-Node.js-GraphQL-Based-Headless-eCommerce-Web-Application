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
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import { ordersAction, orderDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
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
    },
}));

const AllOrders = props => {
    const classes = useStyles();

    useEffect(() => {
        if (isEmpty(props.orders.orders)) {
            props.ordersAction();
        }
    }, []);


    return (
        <Fragment>
            <Alert />
            <Grid container spacing={4} className={classes.mainrow}>
                <Grid item lg={12}>
                    <Card>
                        {props.orders.loading && (
                            <Backdrop className={classes.backdrop} open={true}>
                                <CircularProgress color="inherit" /> Loading
                            </Backdrop>
                        )}

                        <CardHeader
                            title="All Orders"
                        />
                        <Divider />
                        <CardContent>
                            <TableContainer className={classes.container}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.orders.orders.map(order => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    {order.shipping.firstname +  " " + order.shipping.lastname}
                                                </TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>
                                                    <span className={'product-status-chip '+ order.status}>{order.status}</span>
                                                </TableCell> 
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="Edit"
                                                        onClick={() => jumpTo(`view-order/${order.id}`)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="Delete"
                                                        className={classes.deleteicon}
                                                        onClick={() =>
                                                            props.orderDeleteAction(order.id)
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
    return { orders: state.orders };
};

const mapDispatchToProps = {
    ordersAction,
    orderDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

// const AllOrders =() => {
//     return('heelo')
// }

// export default AllOrders;
