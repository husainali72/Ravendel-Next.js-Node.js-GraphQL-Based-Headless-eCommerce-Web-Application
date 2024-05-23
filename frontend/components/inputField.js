import { get } from 'lodash';
import ErrorMessage from './errorMessage';
import PropTypes from 'prop-types';
const InputField = ( {
  type,
  className,
  errors,
  id,
  placeholder,
  value,
  name,
  registerRef,
  onChange,
  handleBlur,
  disabled,
  style
  // ...rest
} ) => {
  return (
    <>
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        onBlur={handleBlur}
        value={value}
        name={name}
        style={style}
        {...registerRef}
        onChange={( e ) => onChange( e, type )}
        disabled={disabled||false}
        // {...rest}
      />
      {
        errors &&
        <div className="error-message">
          <ErrorMessage message={get( errors, `${name}.message`, '' )} />
        </div>
      }
    </>
  );
};
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  registerRef: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default InputField;
