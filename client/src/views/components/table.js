import React, { useState, } from "react";
import {
    Badge,
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
    Avatar,
    Button,
    Tooltip,
    TableSortLabel, useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDeleteAction } from "../../store/action";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { badgeColor } from "../components/BadgeColor";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider, } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Searching } from "../components/searching";
import { stableSort, getComparator } from "../components/sorting";
import { Alert, Loading } from "../components";
import theme from "../../theme/index";

const Tablecomponent = ({ classname, rows, columns, loading, editpage, title, addpage, editfunction,
    deletefunction, }) => {


    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [order, setOrder] = useState('desc');
    const classes = viewStyles();
    const [orderBy, setOrderBy] = useState('date');
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleOnChangeSearch = (filteredData) => {

        // setAllproduct([...filteredData])
    }
    return (
        <>
            <Alert />
            <Grid container spacing={0} className={!classname ? classes.mainrow : null}>
                <Grid item xl={12} md={12}>
                    <Card>
                        {loading ? <Loading /> : null}
                        <CardHeader
                            action={
                                addpage ? <Link to={`${client_app_route_url + addpage}`}>
                                    <Button
                                        color="success"
                                        className={classes.addUserBtn}
                                        size="small"
                                        variant="contained"
                                    >
                                        {addpage.replaceAll('-', ' ')}
                                    </Button>
                                </Link> : null
                            }
                            title={title}
                        />
                        {/* <Searching searchData={products.products} searchby="name" handleOnChangeSearch={handleOnChangeSearch} /> */}
                        <Divider />
                        <CardContent>
                            <TableContainer>
                                {/* <Searching searchData={rows} searchby="first_name" handleOnChangeSearch={handleOnChangeSearch} /> */}
                                <Table stickyHeader aria-label="all-products" size="small">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((head) => {

                                                return head.sortingactive ?
                                                    <TableCell sortDirection="desc" variant="contained" color="primary">
                                                        <Tooltip enterDelay={300} title="Sort">
                                                            <TableSortLabel direction={order} onClick={() => {
                                                                setOrder(order === "asc" ? "desc" : "asc")
                                                                setOrderBy(head.name)
                                                            }}>
                                                                {head.title}
                                                            </TableSortLabel>
                                                        </Tooltip>
                                                    </TableCell> : <TableCell variant="contained" color="primary">{head.title === "image" ? <ImageIcon /> : head.title}</TableCell>
                                            })}

                                        </TableRow>
                                    </TableHead>

                                    <TableBody className={classes.container}>
                                        {rows && rows.length > 0 ?

                                            stableSort(rows, getComparator(order, orderBy))
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage
                                                ).map((data) => {
                                                    return < TableRow key={data.id} hover >
                                                        {columns.map((column) => {

                                                            switch (column.name) {
                                                                case 'image':
                                                                    return <TableCell>
                                                                        <Avatar

                                                                            alt={data.name}
                                                                            src={data.image} />
                                                                    </TableCell>
                                                                case 'same_actions':

                                                                    return (<TableCell>
                                                                        <Tooltip title="Edit shipping" aria-label="edit">
                                                                            <IconButton style={{ paddingLeft: "0px" }}
                                                                                aria-label="Edit"
                                                                                onClick={() => editfunction(data)}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        {!data.system && (
                                                                            <Tooltip title="Delete shipping" aria-label="delete">
                                                                                <IconButton style={{ paddingRight: "170px" }}
                                                                                    aria-label="Delete"
                                                                                    className={classes.deleteicon}
                                                                                    onClick={() => deletefunction(data.id)}
                                                                                    disabled
                                                                                > <DeleteIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )}
                                                                    </TableCell>)
                                                                case 'date':
                                                                    return <TableCell>
                                                                        {convertDateToStringFormat(data.date)}
                                                                    </TableCell>
                                                                case 'email':
                                                                    return <TableCell style={{ textTransform: "lowercase" }}>{data.email}</TableCell>
                                                                case 'role':
                                                                    return <TableCell style={{ textTransform: "capitalize" }}>{data.role}</TableCell>
                                                                case 'shipping_status':
                                                                    return <TableCell>
                                                                        <Badge badgeContent={data.shipping_status} color={badgeColor(data.shipping_status)} className={classes.badge} sx={{ ml: '60px', "& .MuiBadge-badge": { width: "120px", fontSize: 10, padding: "10px", minWidth: 15, } }} />
                                                                    </TableCell>

                                                                case 'payment_status':
                                                                    return <TableCell>
                                                                        <Badge badgeContent={data.payment_status} color={badgeColor(data.payment_status)} className={classes.badge} sx={{ ml: '60px', "& .MuiBadge-badge": { width: "120px", fontSize: 10, padding: "10px", minWidth: 15, } }} />
                                                                    </TableCell>
                                                                case 'actions':

                                                                    return (<TableCell >
                                                                        <Tooltip title="Edit " aria-label="edit">

                                                                            <IconButton
                                                                                aria-label="Edit"

                                                                                onClick={

                                                                                    () =>
                                                                                        navigate(
                                                                                            `${client_app_route_url + editpage}/${data.id}`
                                                                                        )

                                                                                }
                                                                            >
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Delete " aria-label="delete">
                                                                            <IconButton
                                                                                aria-label="Delete"
                                                                                className={classes.deleteicon}
                                                                                onClick={() =>
                                                                                    dispatch(deletefunction(data.id))
                                                                                }
                                                                                disabled
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>)
                                                                case column.name:
                                                                    return <TableCell>
                                                                        {data[column.name]}
                                                                    </TableCell>
                                                            }
                                                        })}
                                                    </TableRow>

                                                }) : "No data"}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={rows.length || 0}
                                rowsPerPage={rowsPerPage || 10}
                                page={page || 0}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default function TableComponent({ loading, classname, rows, columns, title, editpage, addpage, editfunction,
    deletefunction, }) {

    return (
        <ThemeProvider theme={theme}>
            <Tablecomponent columns={columns} rows={rows} loading={loading} classname={classname} editpage={editpage} title={title} addpage={addpage} editfunction={editfunction}

                deletefunction={deletefunction} />
        </ThemeProvider>
    );
}