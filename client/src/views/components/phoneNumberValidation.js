import MuiPhoneNumber from "material-ui-phone-number";


const PhoneNumber = ({ handleOnChange, phoneValue }) => {

    const handleChange = (value) => {

        handleOnChange(value)


    };
    return (
        <>

            <MuiPhoneNumber
                value={phoneValue}
                defaultCountry={"us"}
                label="Phone"
                name="phone"
                variant="outlined"
                onChange={handleChange}
                isValid={(value, country) => {

                    if (value.length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                }}
            />
        </>
    )
}
export default PhoneNumber