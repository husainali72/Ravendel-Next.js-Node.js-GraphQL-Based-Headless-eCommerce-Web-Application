import { get } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import {
  currencySetter,
  formatNumber,
  getPrice,
} from "../../order/CurrencyFormat";
const Price = ({ price }) => {
  const settings = useSelector((state) => state.settings);
  const [currency, setCurrency] = useState("$");
  const [currencyOption, setCurrencyOption] = useState({});
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "settings.store.currency_options",
      {}
    );
    setCurrencyOption({ ...currencyStoreOptions });
    setCurrency(get(currencyStoreOptions, "currency"));
  }, [settings]);
  return (
    <>
      {currencySetter(currency, "12px")}
      {getPrice(formatNumber(price), currencyOption)}
    </>
  );
};
Price.propTypes = {
  price: PropTypes.number.isRequired,
};
export default Price;
