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

const StarRating = ({ stars }) => {
    // console.log("stars", stars)
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
    }, [])

    return (
        <div
            onMouseOver={hoverOver}
            onMouseOut={() => hoverOver(null)}
            onClick={event => setRating(event.target.getAttribute("star-id"))}
        >
            {Array.from({ length: 5 }, (v, i) => (
                <Star key={i} starId={i + 1} marked={selection ? selection > i : rating > i} />
            ))}
        </div>
    );
};

export default StarRating;