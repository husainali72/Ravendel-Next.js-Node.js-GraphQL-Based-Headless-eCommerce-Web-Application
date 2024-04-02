import { get } from "lodash";
import PropTypes from "prop-types";
const AddressDetails = ({ title, address }) => {
  return (
    <div className="row">
      <h4>{title}</h4>
      <p>
        {get(address, "firstname", "")} {get(address, "lastname", "")} <br />
        {get(address, "email", "")} <br />
        {get(address, "phone", "")} <br />
        {get(address, "address", "")} <br />
        {get(address, "city", "")} {get(address, "state", "")}{" "}
        {get(address, "country", "")}
      </p>
    </div>
  );
};

AddressDetails.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
};
export default AddressDetails;
