import  { useEffect } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const AlertModal = ({
  allowOutsideClick,
  confirmAction,
  icon,
  title,
  text,
  showConfirmButton,
  confirmButtonText,
  confirmButtonColor,
}) => {
  const handleConfirm = async () => {
    await confirmAction();
  };

  useEffect(() => {
    Swal.fire({
      icon: icon || "error",
      title: title || "Oops...",
      text: text || "Something went wrong!",
      showConfirmButton: showConfirmButton ?? true,
      confirmButtonText: confirmButtonText || "OK",
      confirmButtonColor: confirmButtonColor || "#3085d6",
      allowOutsideClick: allowOutsideClick ?? true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(); // Call handleConfirm when the user confirms
      }
    });
  }, []);

  return null;
};

AlertModal.propTypes = {
  allowOutsideClick: PropTypes.bool,
  confirmAction: PropTypes.func.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  confirmButtonColor: PropTypes.string,
};

export default AlertModal;
