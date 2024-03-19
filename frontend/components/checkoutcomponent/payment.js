/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
    ElementsConsumer
} from '@stripe/react-stripe-js';
import CreditCards from './myCard/CreditCards';
import PaymentForm from './reactstripe/PaymentForm';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            background: "black",
            fontWeight: 700,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
        },
        invalid: {
            iconColor: "red",
            color: "white"
        }
    }
}
const CheckoutForm = (props) => {
    // console.log(props)
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const [stripeError, setStripeError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const checkoutOptions = {
        listItems: [{ id: 1, value: 15 }, { id: 2, value: 23 }],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { stripe, elements } = props;

        if (!stripe || !elements) {
            return;
        }
        setPaymentLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: "test",
                email: "test@gmail.com",
                phone: 1234567890,
                address: {
                    city: "india",
                    country: "US",
                    line1: "address line 1",
                    line2: "addres linr 2",
                    postal_code: "",
                    state: "mp",
                }
            },
        });
        // console.log(paymentMethod);
        // console.log(error);
        if (error) { setStripeError(error.message) }
        setPaymentLoading(false);

    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "25%" }}>
            <CardElement option={checkoutOptions} />
            <button type="submit" disabled={!stripe}>
                {isPaymentLoading ? "Loading..." : "Pay"}

            </button>
        </form>
    );
}

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_51I1n3IBidFvtlkRG8jL8H2UJqLZv7O4mDdLcvctSIfVigfPA07fFZTARn8IseUNvOHs6UahHeV29qgXD6Q6iGkRv001Yyj8i23");
    }
    return stripePromise
}


const InjectedCheckoutForm = (billingInfo) => (
    < ElementsConsumer >
        {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements} billingInfo={billingInfo} />

        )}
    </ElementsConsumer >
);

const Payment = (billingInfo) => {
    console.log("==", billingInfo)
    return (
        <Elements stripe={getStripe()} billingInfo={billingInfo}>
            <InjectedCheckoutForm billingInfo={billingInfo} />
        </Elements>

    )
}
export default Payment;