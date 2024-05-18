
import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const MultiRangeSlider = ({ min, max, onChange,minValue,maxValue,onBlur }) => {
    const [minVal, setMinVal] = useState(minValue); // Use props to initialize minVal
    const [maxVal, setMaxVal] = useState(maxValue); // Use props to initialize maxVal
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Update minVal and maxVal when props change
    useEffect(() => {
        setMinVal(minValue);
        setMaxVal(maxValue);
    }, [minValue, maxValue]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, maxVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, maxVal, getPercent]);
    return (
        <div>
            <input
                type="range"
                onBlur={onBlur}
                min={min}
                max={max}
                value={minValue}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                    onChange({ min: value, max: maxVal });
                }}
                className={classnames("thumb thumb--zindex-3", {
                    "thumb--zindex-5": minVal > max - 100
                })}
            />
            <input
                type="range"
                min={min}
                max={max}
                onBlur={onBlur}
                value={maxValue}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                    onChange({ min: minVal, max: value });
                }}
                className="thumb thumb--zindex-4"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                {/* <div className="slider__left-value">{minVal}</div> */}
                {/* <div className="slider__right-value">{maxVal}</div> */}
            </div>
        </div>
    );
};
MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onBlur: PropTypes.func.isRequired,
};

export default MultiRangeSlider;