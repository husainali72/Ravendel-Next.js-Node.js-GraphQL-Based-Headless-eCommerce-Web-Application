function descendingComparator(a, b, orderBy, key) {

    if (key) {
        if (typeof a[key][orderBy] === "number" && typeof b[key][orderBy] === "number") {
            return b[key][orderBy] < a[key][orderBy] ? -1 : 1;
        } else if (typeof a[key][orderBy] === "string" && typeof b[key][orderBy] === "string") {

            return b[key][orderBy].toLowerCase() < a[key][orderBy].toLowerCase() ? -1 : 1
        }
        else {
            return 0;
        }
    } else {
        if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
            return b[orderBy] < a[orderBy] ? -1 : 1;
        } else if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string") {
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

    return stabilizedThis.map((el) => {

        return el[0]
    });
}
