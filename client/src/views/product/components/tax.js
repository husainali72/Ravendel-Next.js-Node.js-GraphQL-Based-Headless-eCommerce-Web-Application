import React, { useEffect, useState, useRef } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { taxAction } from "../../../store/action/";
import viewStyles from "../../viewStyles";

const TaxComponent = ({ product, onTaxInputChange, onTaxClassChange, tax_class }) => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const taxState = useSelector((state) => state.taxs);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    if (!taxState.tax.global.is_global) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
    dispatch(taxAction());
  }, []);

  useEffect(() => {

    if (taxState.tax.taxClass.length) {

      let taxClass = product && taxState.tax.taxClass?.some((taxClass) => taxClass._id === product)
      onTaxInputChange(taxClass ? product : taxState?.tax?.taxClass[0]?._id);

    }
  }, [taxState.tax]);

  return (
    <>
      {!taxState.tax.global.is_global ? (
        <FormControl className={classes.cstmSelect} variant="outlined">
          <InputLabel ref={inputLabel} id="tax-name">
            Tax Class
          </InputLabel>
          <Select
            label="Tax Class"
            labelWidth={labelWidth}
            labelId="tax-name"
            id="tax-name"
            name="tax-name"
            value={product}
            onChange={(e) => onTaxInputChange(e.target.value)}
          >
            {taxState.tax.taxClass.map((tax) => {
              return (
                <MenuItem value={tax._id} key={tax._id}>
                  {tax.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <em className={classes.noteline}>
          The global tax option is on currently. To configure the tax for
          individual products, please turn off the global tax option first.
        </em>
      )}
    </>
  );
};

export default TaxComponent;
