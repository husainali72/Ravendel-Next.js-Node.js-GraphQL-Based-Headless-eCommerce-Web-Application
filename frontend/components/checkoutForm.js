/* eslint-disable no-unused-vars */
import React from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [ email, setEmail ] = React.useState( '' );
  const [ message, setMessage ] = React.useState( null );
  const [ isLoading, setIsLoading ] = React.useState( false );

  React.useEffect( () => {
    if ( ! stripe ) {
      return;
    }

    const clientSecret = new URLSearchParams( window.location.search ).get(
      'payment_intent_client_secret'
    );

    if ( ! clientSecret ) {
      return;
    }

    stripe.retrievePaymentIntent( clientSecret ).then( ( { paymentIntent } ) => {
      switch ( paymentIntent.status ) {
        case 'succeeded':
          setMessage( 'Payment succeeded!' );
          break;
        case 'processing':
          setMessage( 'Your payment is processing.' );
          break;
        case 'requires_paymentMethod':
          setMessage( 'Your payment was not successful, please try again.' );
          break;
        default:
          setMessage( 'Something went wrong.' );
          break;
      }
    } );
  }, [ stripe ] );

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    if ( ! stripe || ! elements ) {
      return;
    }

    setIsLoading( true );

    const { error } = await stripe.confirmPayment( {
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/orderstatus/thankyou',
      },
    } );
    if ( 'card_error' === error.type || 'validation_error' === error.type ) {
      setMessage( error.message );
    } else {
      setMessage( 'An unexpected error occurred.' );
    }

    setIsLoading( false );
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={( e ) => setEmail( e.target.value )}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button  disabled={isLoading || ! stripe || ! elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
