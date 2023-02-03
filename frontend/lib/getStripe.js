

import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const KEY = "pk_test_51MTLlASF6q8oKUUa8Ks4cmIZ80LYwzsY3qw3ds12TE1bxXjmNTObDjRjOWtylyCrb8j0tloGev5xEsmLojpi0YjS00OMnJlRX0"
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(KEY);
  }

  return stripePromise;
}

export default getStripe;