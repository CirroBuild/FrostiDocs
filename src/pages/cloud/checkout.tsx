import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutform";
import "./checkout.css";




// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_live_51KwzfwHhWdwlUcT1X8AlN5uQ4ItLKQqUnfTVVKraskiBlcLBv02KnYqgsadNs8CDTsEn8aSrJ8Nw3V0p0pFUlLfm00SZP0rn4P");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      return await fetch("https://frostifu-ppe-eus-functionappc1ed.azurewebsites.net/api/StripePaymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*' },
        body: JSON.stringify({ items: [{ id: "beta-plan" }] }),
      })

    }
    createPaymentIntent()
      .then(async (res) => await res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((e: Error) => {
          console.log(e);
      });
  }, []);


  const options = {
    clientSecret,
    theme: "stripe",
  };

  return (
    <div className="Checkout">
      {clientSecret !== null && clientSecret!==""  && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}