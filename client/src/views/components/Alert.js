import React, { Fragment, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
import { connect, useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: "100px" }}
    >
      {alert.error && alert.message ? (
        <Alert severity="error" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      ) : alert.success && alert.message ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default Alerts;
