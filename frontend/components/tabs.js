import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const ReactTabs = ({ options, active, onChange }) => {
  const handleTabChange = (selectedTab) => {
    const selectedOption = options.find(
      (opt) => opt?.id?.toString() === selectedTab
    );
    onChange(selectedOption);
  };
  const getActiveOption = () => {
    const selectedOption = options.find(
      (opt) =>
        (active?.field === "pricing.sellprice" && opt?.type === active?.type) ||
        opt?.type === active?.type
    );
    return selectedOption?.id;
  };
  return (
    <Tabs
      id="controlled-tabs"
      className="custom-tabs"
      activeKey={getActiveOption()}
      onSelect={handleTabChange}
    >
      {options &&
        options?.length > 0 &&
        options?.map((tab) => (
          <Tab
            key={tab?.id}
            eventKey={tab?.id?.toString()}
            title={
              <div className="tab-title">
                <span>{tab?.title}</span>
              </div>
            }
          ></Tab>
        ))}
    </Tabs>
  );
};

ReactTabs.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default ReactTabs;
