import palette from "./palette";

export const customStyles = {
    control: (base, state) => ({
        ...base,
        border: `1px solid #154050`,
        fontSize: "14px",
        boxShadow: 'none',


        '&:hover': {
            border: `1px solid #154050`,

        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "lightgrey" : "white",

        fontSize: "14px",
        letterSpacing: "-0.04px",
        lineHeight: "18px",
        '&:hover': {
            backgroundColor: "lightgrey"
        }
    }),
};