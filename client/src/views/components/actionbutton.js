import { Tooltip, IconButton, } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const ActionButton = ({ onClick, showDeleteButton }) => {

    return (
        <>
            <Tooltip title="Edit " aria-label="edit">
                <IconButton
                    aria-label="Edit"
                    type='edit'
                    onClick={() => onClick('edit')}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            {showDeleteButton ? <Tooltip title="Delete " aria-label="Delete">
                <IconButton
                    aria-label="Delete"
                    type='delete'
                    onClick={() => onClick('delete')}
                    disabled
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip> : null}
        </>
    )
}
export default ActionButton