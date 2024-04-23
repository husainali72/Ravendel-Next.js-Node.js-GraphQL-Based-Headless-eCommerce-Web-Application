import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { get } from "lodash";

const CheckBox = ({ options, value, name, onChange, className }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (e) => {
    if(name==='paymentMethod'){
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    }
    onChange(e); 
  };
  return (
    <Form>
      <Form.Group value={value} onChange={handleOptionChange}>
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
            {selectedOption === get(option,'value') && (
              <p className="payment_method_description">
             Description : {get(option,'description')}
              </p>
            )}
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
