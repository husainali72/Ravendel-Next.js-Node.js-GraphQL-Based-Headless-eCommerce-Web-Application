import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { get } from "lodash";
import ErrorMessage from "./errorMessage";
import "react-phone-input-2/lib/bootstrap.css";
import { phoneErrorMessage } from "./validationMessages";
import { phoneNumberValidation } from "../utills/Validation";
const PhoneInputField = ({
  name,
  control,
  enableSearch,
  value,
  handleChange,
  errors,
  className,
  placeholder,
  country,
  inputClass,
  type,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: !value,
            message: phoneErrorMessage,
          },
          validate: () => {
            const phoneNumber = value;
            return phoneNumberValidation(phoneNumber);
          },
        }}
        render={({}) => (
          <PhoneInput
            enableSearch={enableSearch}
            country={country}
            inputClass={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e, type)}
            className={className}
          />
        )}
      />
      <ErrorMessage message={get(errors, `${name}.message`, "")} />
    </>
  );
};

export default PhoneInputField;
