import Swal from "sweetalert2";

export const showAlertModal = ({
  title,
  showCancelButton,
  confirmButtonText,
  confirmButtonColor,
  ConfirmedButton
}) => {
  Swal.fire({
    title,
    showCancelButton,
    confirmButtonColor,
    confirmButtonText,
    cancelButtonColor:'#ce0b0b',
    
  }).then((result) => {
    if (result.isConfirmed) {
      ConfirmedButton();
    }
  });
};
