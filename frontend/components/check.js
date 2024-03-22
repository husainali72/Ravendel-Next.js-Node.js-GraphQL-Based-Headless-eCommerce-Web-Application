import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckBox = ({ options, value, name, onChange, className }) => {
  return (
    <Form>
      <Form.Group value={value} onChange={onChange}>
        {options?.map((option, index) => (
          <div key={`inline-${option.value}-${index}`} className="mb-3">
            <Form.Check
              label={option?.label}
              name={name}
              type="radio"
              value={option?.value}
              id={`inline-${option.value}-${index}`}
              className={className}
            />
          </div>
        ))}
      </Form.Group>
    </Form>
  );
};

CheckBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default CheckBox;
