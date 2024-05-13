import React, { useState } from "react";
import PropTypes from "prop-types";
const QuantitySelector = ({ changeQuantity, quantity }) => {
  const [newQuantity, setQuantity] = useState(quantity||1);

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
    <div>
      <button onClick={handleDecrement}>-</button>
      <input type="number" value={newQuantity} onChange={handleChange} />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};
QuantitySelector.propTypes = {
  changeQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default QuantitySelector;
