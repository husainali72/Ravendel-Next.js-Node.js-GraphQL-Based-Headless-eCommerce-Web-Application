/* eslint-disable react/prop-types */
import { capitalize } from 'lodash'
import React from 'react'
import { Button } from 'react-bootstrap'

const DetailsCard = ({info, btnAction, btnText, title}) => {
  return (
    <>
        <div className="checkout-details-title">
            <h5>{title}</h5>
        </div>
        <div className="checkout-shipping-address">
            <div className="checkout-list-content">
                <div className='info'>
                    <h6 style={{ fontWeight: "600" }}>
                        {" "}
                        {capitalize(info.firstname)}{" "}
                        {capitalize(info.lastname)}
                    </h6>
                    <p>{info.phone}</p>
                </div>
                <p>
                    {capitalize(info.city)} {capitalize(info.state)}{" "}
                    {capitalize(info.zip)} {capitalize(info.country)}
                </p>
            </div>
            <div className="checkout-shipping-edit-btn">
            <Button variant="outline-primary" onClick={btnAction}>
                {btnText}
            </Button>{" "}
            </div>
        </div>
    </>
  )
}

export default DetailsCard