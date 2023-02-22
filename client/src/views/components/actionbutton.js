import { Tooltip, IconButton, } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const ActionButton = ({ onClick }) => {
    return (
        <>
            <Tooltip title="Edit " aria-label="edit">

                <IconButton
                    aria-label="Edit"
                    type='edit'
                    onClick={

                        () => onClick('edit')

                    }
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit " aria-label="edit">

                <IconButton
                    aria-label="Edit"
                    type='delete'
                    onClick={

                        () => onClick('delete')

                    }
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}
export default ActionButton