import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckBox = ({ options, value, name, onChange, className,type }) => {
  return (
    <Form>
        {options?.map((option, index) => (
          <div key={`inline-${option.value}-${index}`} className="mb-3">
            <Form.Check
            key={value?.id}
              label={option?.label}
              name={name}
              type={type}
              value={option?.value}
              id={`inline-${option.value}-${index}`}
              onChange={(e)=>onChange(e)}
              className={className}
              checked={option?.select}
            />
           </div>
        ))}
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
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default CheckBox;
