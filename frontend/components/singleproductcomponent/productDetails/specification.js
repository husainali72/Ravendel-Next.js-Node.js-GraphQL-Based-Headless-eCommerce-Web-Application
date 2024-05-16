import { get } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const Specification = ({ specifications }) => {
  const [formattedSpecifications, setFormattedSpecifications] = useState([]);
  useEffect(() => {
    const transformedSpecifications = specifications?.reduce((acc, spec) => {
      const existingGroupIndex = acc?.findIndex(
        (item) => item.group === spec.group
      );
      if (existingGroupIndex !== -1) {
        const existingGroup = acc[existingGroupIndex];
        const existingValue = get(existingGroup, "values", [])?.find(
          (item) => item.key === spec.key
        );
        if (existingValue) {
          existingValue.value = spec?.value;
        } else {
          existingGroup.values.push({ key: spec?.key, value: spec?.value });
        }
      } else {
        acc.push({
          group: spec?.group,
          values: [{ key: spec?.key, value: spec?.value }],
        });
      }
      return acc;
    }, []);
    setFormattedSpecifications(transformedSpecifications);
  }, [specifications]);
  return (
    <div>
      <h5>Specifications</h5>
      <div className="specification-value">
        {formattedSpecifications?.map((specification, index) => (
          <div key={index} className="specification-group">
            <p className="group-name">{specification?.group}</p>
            <div className="specs-group">
              {specification?.values?.map((specificationValues, i) => (
                <div key={i} className="key-value-container">
                  <p className="specification-key">{specificationValues?.key}</p>
                  <p className="value">{specificationValues?.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
Specification.propTypes = {
  specifications: PropTypes.array,
};
export default Specification;
