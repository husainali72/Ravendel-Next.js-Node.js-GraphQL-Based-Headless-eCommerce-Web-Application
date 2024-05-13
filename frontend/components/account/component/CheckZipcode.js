/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import client from "../../../apollo-client";
import { CHECK_ZIPCODE } from "../../../queries/productquery";
import { get } from "lodash";

const CheckZipcode = ({ checkzipcode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ZipCode, setZipCode] = useState("");
  const [ZipMessage, setZipMessage] = useState("");
  const [ZipMessageSuccess, setZipMessageSuccess] = useState(false);
  useEffect(() => {
    if (ZipCode) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ZipCode]);
  const handleInputChange = (e) => {
    let value = get(e, "target.value");
    if (!value) {
      checkzipcode(true);
    }
    setZipCode(value);
    if (ZipMessage) {
      setZipMessage(" ");
    }
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const checkCode = async () => {
      try {
        const { data: result } = await client.query({
          query: CHECK_ZIPCODE,
          variables: { zipcode: ZipCode.toString() },
        });
        setZipMessage(result.checkZipcode.message);
        setZipMessageSuccess(result.checkZipcode.success);
        checkzipcode(result.checkZipcode.success);
      } catch (e) {
        console.log(
          "ZipCode error ==>",
          e.networkError && e.networkError.result
            ? e.networkError.result.errors
            : ""
        );
      }
      setIsLoading(false);
    };
    checkCode();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="zip-form">
        <div className="zip-code-field">
          <label className="zip-lable">Delivery</label>
          <div className="field">
            <input
              type="text"
              placeholder="Enter Your Zipcode"
              maxLength={10}
              minLength={6}
              value={ZipCode}
              onChange={handleInputChange}
            />
            <Button type="submit" size="sm" variant="light" disabled={isLoading}>
              Check
            </Button>
          </div>
        </div>
        {/* <button>Check</button> */}
        <p className={`zip-message ${ZipMessageSuccess && "text-success"}`}>
          {ZipMessage && ZipMessage}
        </p>
      </form>
    </div>
  );
};

export default CheckZipcode;
