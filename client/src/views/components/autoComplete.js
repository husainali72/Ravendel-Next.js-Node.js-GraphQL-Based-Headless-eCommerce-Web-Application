import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CustomAutocomplete = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  getOptionDisabled,
}) => {
  return (
    <Autocomplete
      id={id}
      name={name}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      )}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionDisabled={getOptionDisabled}
    />
  );
};

CustomAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  isOptionEqualToValue: PropTypes.func.isRequired,
  getOptionDisabled: PropTypes.func,
};

CustomAutocomplete.defaultProps = {
  getOptionDisabled: () => false,
};

export default CustomAutocomplete;
