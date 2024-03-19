/* eslint-disable no-undef */


import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const KEY =process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(KEY);
  }

  return stripePromise;
}

export default getStripe;