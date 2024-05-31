import React from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { get } from 'lodash';
import ErrorMessage from './errorMessage';
import 'react-phone-input-2/lib/bootstrap.css';
import { phoneErrorMessage } from './validationMessages';
import { phoneNumberValidation } from '../utills/Validation';
import PropTypes from 'prop-types'; 
const PhoneInputField = ( {
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
} ) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: ! value,
            message: phoneErrorMessage,
          },
          validate: () => {
            const phoneNumber = value;
            return phoneNumberValidation( phoneNumber );
          },
        }}
        render={() => (
          <PhoneInput
            enableSearch={enableSearch}
            country={country||'us'}
            inputClass={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={( e ) => handleChange( e, type )}
            className={className}
          />
        )}
      />
      <ErrorMessage message={get( errors, `${name}.message`, '' )} />
    </>
  );
};
PhoneInputField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  enableSearch: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  inputClass: PropTypes.string,
  type: PropTypes.string.isRequired,
};
export default PhoneInputField;
