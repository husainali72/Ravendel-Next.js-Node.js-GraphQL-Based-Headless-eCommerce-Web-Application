/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

const Star = ({ starId, marked }) => {
    return (
        <span
            star-id={starId}
            role="button"
            style={{ color: "#ff9933", cursor: "pointer", fontSize: 20, m: 0 }}
        >
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
};

const StarRating = ({ stars, singleProducts }) => {
    const [selection, setSelection] = React.useState(0);
    const [rating, setRating] = React.useState(0);

    const hoverOver = event => {
        let starId = 0;
        if (event && event.target && event.target.getAttribute("star-id")) {
            starId = event.target.getAttribute("star-id");
        }
        setSelection(stars);
    };
    useEffect(() => {
        setSelection(stars);
    }, [singleProducts])

    return (
        <div
            onMouseOver={hoverOver}
            onMouseOut={() => hoverOver(null)}
            onClick={event => setRating(event.target.getAttribute("star-id"))}
        >
            {stars === '0' || stars === 0 ? '' : Array.from({ length: 5 }, (v, i) => (
                // <Star key={i} starId={i + 1} marked={selection ? selection > i : rating > i} />
                <Star key={i} starId={i + 1} marked={selection && selection > i ? true : false} />
            ))}
        </div>
    );
};

export default StarRating;