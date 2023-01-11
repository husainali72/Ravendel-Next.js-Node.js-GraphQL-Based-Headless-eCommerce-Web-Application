import React, { Fragment, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { connect, useDispatch, useSelector } from "react-redux";

function CustomAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

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
    <>
      <Snackbar
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
      </Snackbar>
    </>
  );
};

export default Alerts;
