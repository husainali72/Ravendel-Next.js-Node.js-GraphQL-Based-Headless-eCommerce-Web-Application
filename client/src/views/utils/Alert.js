import React, { Fragment, useState, useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
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
      }, 3000);
    }
  }, [props.alert.success]);

  return (
    <Fragment>
      <Toast isOpen={isOpen}>
        <ToastHeader>Alert</ToastHeader>
        <ToastBody>{props.alert.message}</ToastBody>
      </Toast>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { alert: state.alert };
};

//const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(Alert);
