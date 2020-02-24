import React, { Fragment, useState, useEffect } from "react";
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from "react-redux";
const Alert = props => {
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    if (props.alert.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        props.dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "" }
        });
      }, 6000);
    }
  }, [props.alert.success]);

  return (
    <Fragment>
      {/* <Toast isOpen={isOpen}>
        <ToastHeader>Alert</ToastHeader>
        <ToastBody>{props.alert.message}</ToastBody>
      </Toast> */}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        open={isOpen}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.alert.message}</span>}
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { alert: state.alert };
};

//const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(Alert);
