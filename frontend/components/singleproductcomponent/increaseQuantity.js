import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import notify from "../../utills/notifyToast";

const QuantitySelector = ({
  changeQuantity,
  quantity,
  decreaseBtnClass,
  inputClass,
  increaseBtnClass,
  hideLabel,
  actualQuantity,
}) => {
  const [newQuantity, setQuantity] = useState(quantity); // Initialize with quantity prop

  useEffect(() => {
    if (newQuantity !== quantity) {
      setQuantity(quantity);
    }
  }, [quantity]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = prevQuantity + 1;
      if (updatedQuantity <= actualQuantity) {
        changeQuantity(updatedQuantity);
        return updatedQuantity;
      } else {
        notify(`Only ${actualQuantity} item(s) available in stock.`);
        return prevQuantity;
      }
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const updatedQuantity = prevQuantity - 1;
        changeQuantity(updatedQuantity);
        return updatedQuantity;
      }
      return prevQuantity;
    });
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
      changeQuantity(value);
    } else {
      setQuantity("");
      changeQuantity("");
    }
  };
  const handleBlur = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      notify("Please enter a valid quantity greater than 0.");
    } else if (value > actualQuantity) {
      notify(`Only ${actualQuantity} item(s) available in stock.`);
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
          onBlur={handleBlur}
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
  actualQuantity: PropTypes.number.isRequired,
  decreaseBtnClass: PropTypes.string,
  inputClass: PropTypes.string,
  increaseBtnClass: PropTypes.string,
  hideLabel: PropTypes.bool,
};

export default QuantitySelector;
