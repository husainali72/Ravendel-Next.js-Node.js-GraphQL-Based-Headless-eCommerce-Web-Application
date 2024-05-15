import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { get } from "lodash";

const CheckBox = ({ options, value, name, onChange, className, type }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (e) => {
    if (name === "paymentMethod") {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue);
    }
    onChange(e);
  };
  return (
    <Form>
      {options?.map((option, index) => (
        <div key={`inline-${option.value}-${index}`} className="mb-2">
          <Form.Check
            key={value?.id}
            label={option?.label}
            name={name}
            type={type}
            value={option?.value}
            id={`inline-${option.value}-${index}`}
            onChange={(e) => handleOptionChange(e)}
            className={className}
            checked={option?.select}
          />

          {selectedOption === get(option, "value") && (
            <>
              {get(option, "description") && ( // Check for "description" property
                <p className="payment_method_description">
                  Description: {get(option, "description")}
                </p>
              )}
              {get(option, "detail", [])?.map(
                (item, index) =>
                  item?.value && (
                    <p key={index} className="payment_method_description">
                      {item?.key}: {item?.value}
                    </p>
                  )
              )}
            </>
          )}
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
