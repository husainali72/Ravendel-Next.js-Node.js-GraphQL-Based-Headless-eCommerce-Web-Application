import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  borderRadius: 3
};

export default function BasicModal({openState, children, handleClose, className}) {
  const [open] = openState;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={className}>
            {children}
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  openState: PropTypes.any.isRequired,
  children: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};
