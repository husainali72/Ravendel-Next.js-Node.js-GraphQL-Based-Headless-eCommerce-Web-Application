import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
const QuantitySelector = ({
  changeQuantity,
  quantity,
  decreaseBtnClass,
  inputClass,
  increaseBtnClass,
  hideLabel,
}) => {
  const [newQuantity, setQuantity] = useState(quantity || 1);
  useEffect(() => {
    if (newQuantity !== quantity) {
      setQuantity(quantity);
    }
  }, [quantity]);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    changeQuantity(newQuantity + 1); // Call changeQuantity with updated quantity
  };

  const handleDecrement = () => {
    if (newQuantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      changeQuantity(newQuantity - 1); // Call changeQuantity with updated quantity
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      changeQuantity(value); // Call changeQty with updated quantity
    }
  };
  return (
    <div className="qty-input">
      {!hideLabel && <label>Quantity</label>}
      <div>
        <button onClick={handleDecrement} className={decreaseBtnClass}>
          -
        </button>
        <input
          value={newQuantity}
          onChange={handleChange}
          className={inputClass}
        />
        <button onClick={handleIncrement} className={increaseBtnClass}>
          +
        </button>
      </div>
    </div>
  );
};
QuantitySelector.propTypes = {
  changeQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  decreaseBtnClass: PropTypes.string,
  inputClass: PropTypes.string,
  increaseBtnClass: PropTypes.string,
  hideLabel: PropTypes.boolean,
};

export default QuantitySelector;
