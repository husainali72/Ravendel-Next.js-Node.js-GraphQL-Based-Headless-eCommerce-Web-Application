import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { get } from "lodash";

const RemainingQuantity = ({ quantity }) => {
  const setting = useSelector((state) => state.setting);
  const [showQuantity, setShowQuantity] = useState(true); // Default to true

  useEffect(() => {
    const stockOption = get(setting, "setting.store.inventory");
    const stockDisplayFormat = get(
      stockOption,
      "stock_display_format",
    );
    switch (stockDisplayFormat) {
      case "leftStock":
        setShowQuantity(quantity <= get(stockOption, "left_quantity"));
        break;
      case "never":
        setShowQuantity(false);
        break;
      case "inStock":
        setShowQuantity(true);
        break;
      default:
        setShowQuantity(false);
        break;
    }
  }, [setting, quantity]);

  if (!showQuantity) return null;

  return (
    <>
      {quantity > 0 && (
        <div className="itemComponents-base-lowUnitCount">{`${quantity} Left`}</div>
      )}
    </>
  );
};

RemainingQuantity.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default RemainingQuantity;
