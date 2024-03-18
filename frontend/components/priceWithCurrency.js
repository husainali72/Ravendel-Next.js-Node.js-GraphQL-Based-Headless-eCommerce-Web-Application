import { get } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencySetter, formatNumber, getPrice } from "../utills/helpers";

const Price = ({ price }) => {
  const settings = useSelector((state) => state.setting);
  const [currency, setCurrency] = useState("$");
  const [currencyOption, setCurrencyOption] = useState({});
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "setting.store.currency_options",
      {}
    );
    setCurrencyOption({ ...currencyStoreOptions });
    currencySetter(currencyStoreOptions, setCurrency);
  }, [settings]);
  return (
    <>
      {currency} {getPrice(formatNumber(price), currencyOption)}
    </>
  );
};
export default Price;
