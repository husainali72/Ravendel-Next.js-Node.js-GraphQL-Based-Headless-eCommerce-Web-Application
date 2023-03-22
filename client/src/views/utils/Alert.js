import React, { Fragment, useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
// import Alert from "@mui/material/Alert";
import { connect, useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerts = () => {
  const [isOpen, setisOpen] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "", error: false },
        });
      }, 3000);
    }
  }, [alert.success]);

  return (
     <Snackbar open={isOpen} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
  );
};

export default Alerts;


  {/* <Snackbar
        autoHideDuration={3000}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <CustomAlert severity={alert.error ? "error" : "success"}>
          {alert.message}
        </CustomAlert>
      </Snackbar> */}