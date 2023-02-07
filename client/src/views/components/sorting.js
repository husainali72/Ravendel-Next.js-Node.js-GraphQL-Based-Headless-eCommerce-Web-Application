function descendingComparator(a, b, orderBy) {


    if (typeof a[orderBy] === "number" && typeof a[orderBy] === "number") {
        return b[orderBy] < a[orderBy] ? -1 : 1;
    } else if (typeof a[orderBy] === "string" && typeof a[orderBy] === "string") {
        return b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1
    }
    else {
        return 0;
    }
}

export function getComparator(order, orderBy) {

    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


export function stableSort(array, comparator) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}
