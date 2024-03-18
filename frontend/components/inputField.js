import { get } from "lodash";
import ErrorMessage from "./errorMessage";

const InputField = ({
  type,
  className,
  errors,
  id,
  placeholder,
  value,
  name,
  registerRef,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        {...registerRef}
        onChange={(e) => onChange(e, type)}
      />
      <div className="error-message">
        <ErrorMessage message={get(errors, `${name}.message`, "")} />
      </div>
    </>
  );
};
export default InputField;
