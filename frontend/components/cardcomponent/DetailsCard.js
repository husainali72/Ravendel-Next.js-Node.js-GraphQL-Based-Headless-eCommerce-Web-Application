import { capitalize, get } from 'lodash'
import React from 'react'
import PropTypes from "prop-types";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from 'react-bootstrap'
import { formatPhoneNumber } from '../../utills/helpers';

const DetailsCard = ({info, btnAction, btnText, title, type, style}) => {
  return (
    <>
        <div className="checkout-details-title" style={{...style}}>
            <h5>{title}</h5>
        </div>
        <div className="checkout-shipping-address">
            <div className="checkout-list-content">
                {
                    type &&
                    <div className='address-type'>
                        <b>
                          {!get(info, "addressType") ||
                          get(info, "addressType") === "Home" ? (
                            <HomeOutlinedIcon />
                          ) : get(info, "addressType") ===
                            "Office" ? (
                            <CorporateFareOutlinedIcon />
                          ) : (
                            ""
                          )}
                          {get(info, "addressType") || "Home"}
                        </b>
                    </div>
                }
                <div className='info'>
                    <h6 style={{ fontWeight: "600" }}>
                        {" "}
                        {capitalize(get(info,'firstname',''))}{" "}
                        {capitalize(get(info,'lastname',''))}
                    </h6>
                    <p>{formatPhoneNumber(get(info,'phone',''))}</p>
                </div>
                <p>
                    {capitalize(info?.city||'')} {capitalize(info?.state||'')}{" "}
                    {capitalize(info?.zip||'')} {capitalize(info?.country||'')}
                </p>
            </div>
            <div className="checkout-shipping-edit-btn">
                {
                    btnText &&
                    <Button variant="outline-primary" onClick={btnAction}>
                        {btnText}
                    </Button>
                }
            </div>
        </div>
    </>
  )
}

export default DetailsCard

DetailsCard.propTypes = {
    info: PropTypes.object.isRequired,
    btnAction: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
};