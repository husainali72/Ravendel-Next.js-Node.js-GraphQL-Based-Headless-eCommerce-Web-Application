import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, Typography } from '@mui/material';

export default function AlertModal({ confirm,minWidth, buttons, cancel, open,disableConfirmBtn,disableCancelBtn, Component, showCancelBtn, showConfirmBtn, borderRadius }) {
  return (
    <Dialog
      open={open}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: borderRadius || '',
          minWidth: minWidth ,
          padding:'10px'
        }
      }}
      onClose={() => !disableCancelBtn && cancel()}
      aria-describedby="alert-dialog-slide-description"
    >
      <>
        <DialogContent>{Component}</DialogContent>
        <DialogActions>
          {showCancelBtn && (
            <Button onClick={() => cancel()} variant="outlined" disabled={disableCancelBtn}>
              Cancel
            </Button>
          )}
          {showConfirmBtn && (
            <Button onClick={() => confirm()} variant="contained" disabled={disableConfirmBtn}>
              Confirm
            </Button>
          )}
          {buttons?.map((button) => (
            <Button onClick={() => button?.onClick()} variant={button?.variant} disabled={button?.disabled} color={button?.color || 'primary'}>
              {button?.label}
            </Button>
          ))}
        </DialogActions>
      </>
    </Dialog>
  );
}
