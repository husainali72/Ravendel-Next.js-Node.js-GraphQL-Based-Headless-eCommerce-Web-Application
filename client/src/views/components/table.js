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
    Avatar,
    Button,
    Tooltip,
    TableSortLabel,
    Rating
} from "@mui/material";
import { Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { Searching } from "./searching";
import { badgeColor } from "../components/BadgeColor";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider, } from "@mui/material/styles";
import NodataImage from "../../assets/images/NodataImage.jpg";
import { stableSort, getComparator } from "../components/sorting";
import { Alert, Loading } from "../components";
import theme from "../../theme/index";
const Tablecomponent = ({
    searchdata,
    classname,
    rows,
    columns,
    showDeleteButton,
    loading, title,
    addpage,
    handleOnChangeSearch,
    dropdown,
    statusTabData,
    searchbydate }) => {

    const [order, setOrder] = useState('desc');
    const classes = viewStyles();
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <Alert />
            <Card >
                {loading ? <Loading /> : null}
                <CardHeader
                    action={
                        <>
                            {addpage ? <Link to={`${client_app_route_url + addpage}`} state={{editMode: false}} className={classes.addbtnlink}>
                                <Button
                                    color="success"
                                    className={classes.addUserBtn}
                                    size="small"
                                    variant="contained"
                                >
                                    {addpage.replaceAll('-', ' ')}
                                </Button>
                            </Link> : null}
                        </>
                    }
                    title={title}
                />
                <Searching searchData={searchdata} handleOnChangeSearch={handleOnChangeSearch} dropdown={dropdown} statusTabData={statusTabData} searchbydate={searchbydate} />
                <Divider />
                <CardContent>
                    <TableContainer>
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
                            {rows && rows.length > 0 ?
                                <TableBody className={classes.container}>
                                    {stableSort(rows, getComparator(order, orderBy))
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
                                                        case 'rating':
                                                            return <TableCell>
                                                                <Rating
                                                                    name="read-only"
                                                                    value={Number(data.rating)}
                                                                    readOnly
                                                                />
                                                            </TableCell>
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
                                                        case "actions":
                                                            return <TableCell>
                                                                <column.component onClick={(type) => column.buttonOnClick(type, data.id)} showDeleteButton={data.system ? false : showDeleteButton} />
                                                            </TableCell>
                                                        case column.name:
                                                            return <TableCell>
                                                                {data[column.name]}
                                                            </TableCell>
                                                    }
                                                })}
                                            </TableRow>
                                        })}
                                </TableBody> :
                                <TableBody >
                                    <TableRow >
                                        <TableCell align='center' colSpan={6} >
                                            <img src={NodataImage}
                                                alt='No image'
                                            />
                                            <h3>No Data</h3>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>}
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
        </>
    )
}
export default function TableComponent({
    loading,
    classname,
    searchdata,
    rows,
    columns,
    title,
    editpage,
    addpage,
    handleOnChangeSearch,
    dropdown,
    statusTabData,
    showDeleteButton,
    searchbydate }) {
    return (
        <ThemeProvider theme={theme}>
            <Tablecomponent
                searchbydate={searchbydate}
                dropdown={dropdown}
                columns={columns}
                rows={rows}
                loading={loading}
                classname={classname}
                editpage={editpage}
                title={title} addpage={addpage}
                showDeleteButton={showDeleteButton}
                handleOnChangeSearch={handleOnChangeSearch}
                searchdata={searchdata}
                statusTabData={statusTabData}
            />
        </ThemeProvider>
    );
}