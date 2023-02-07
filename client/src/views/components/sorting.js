function descendingComparator(a, b, orderBy, key) {


    if (key === "orderByName") {

        if (typeof a.shipping[orderBy] === "number" && typeof b.shipping[orderBy] === "number") {
            return b.shipping[orderBy] < a.shipping[orderBy] ? -1 : 1;
        } else if (typeof a.shipping[orderBy] === "string" && typeof a.shipping[orderBy] === "string") {

            return b.shipping[orderBy].toLowerCase() < a.shipping[orderBy].toLowerCase() ? -1 : 1
        }
        else {
            return 0;
        }
    } else {

        if (typeof a[orderBy] === "number" && typeof a[orderBy] === "number") {
            return b[orderBy] < a[orderBy] ? -1 : 1;
        } else if (typeof a[orderBy] === "string" && typeof a[orderBy] === "string") {
            return b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1
        }
        else {
            return 0;
        }
    }
}

export function getComparator(order, orderBy, key) {

    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy, key)
        : (a, b) => -descendingComparator(a, b, orderBy, key);
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
