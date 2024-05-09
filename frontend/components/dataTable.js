/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import { convertDateToStringFormat } from "../utills/helpers";
import { get } from "lodash";
import Price from "./priceWithCurrency";
import { useSelector } from "react-redux";


const Table = ({ rows, columns, colSpan, additionalRows, className }) => {
  const settings=useSelector((state)=>state.setting)
  return (
    <table className={className ? className : "product-detail"}>
      <thead>
        {columns?.map((column) => {
          return <th>{get(column, "title", "")}</th>;
        })}
      </thead>
      <tbody>
        {rows &&
          rows?.length > 0 &&
          rows?.map((row, index) => {
            return (
              <tr key={index}>
                {columns?.map((column) => {
                  switch (column?.type) {
                    case "price":
                      return (
                        <td className={`${column?.className}`}>
                          <Price price={get(row, `${[column?.name]}`, 0)} />
                        </td>
                      );
                    case "attributes":
                      return (
                        <th>
                          {get(row, "attributes", [])?.map((attribute, i) => (
                            <div key={`attributes-${i}`}>
                              {get(attribute, "name", "")} :{" "}
                              {get(attribute, "value", "")}
                            </div>
                          ))}
                        </th>
                      );
                    default:
                      return <td>{get(row, `${[column?.name]}`, "")}</td>;
                  }
                })}
              </tr>
            );
          })}
      </tbody>
      {additionalRows && additionalRows?.length ? (
        additionalRows?.map((data, index) => {
          if (data) {
            switch (get(data, "type")) {
              case "price":
                return (
                  <tr key={`additionalRow-${index}`}>
                    <th
                      colSpan={colSpan || 3}
                      className={`order-text-align ${data?.className}`}
                    >
                      {get(data, "label", "")}
                    </th>
                    <td className={`${data?.className}`}>
                      <Price price={get(data, "value", 0)} />
                    </td>
                  </tr>
                );
              case "date":
                return (
                  <tr key={`additionalRow-${index}`}>
                    <th colSpan={colSpan || 3} className="order-text-align">
                      {get(data, "label", "")}
                    </th>
                    <td>
                      {convertDateToStringFormat(
                        get(data, "value", null),
                        settings
                      )}
                    </td>
                  </tr>
                );
              default:
                return (
                  <tr key={`additionalRow-${index}`}>
                    <th colSpan={colSpan || 3} className="order-text-align">
                      {get(data, "label", "")}
                    </th>
                    <td>{get(data, "value", "")}</td>
                  </tr>
                );
            }
          }
        })
      ) : (
        <td colSpan={columns?.length}>No data found</td>
      )}
    </table>
  );
};

export default Table;
