import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"

export default function CheckoutForm( {clientSecret} : {clientSecret: string}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [paymentID, setPaymentID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const getOid = (): string | null => {
    const isClient = typeof window !== "undefined"
  
    const objectId = () => {
      if (!isClient) {
        return null
      }
  
      return new URLSearchParams(window.location.search).get(
        "oid"
      );
    }
    return objectId()
  }

  const oid = getOid()


  useEffect(() => {
    if (stripe == null) {
      return;
    }

    if (clientSecret == null) {
      return;
    }

    const retrievePaymentIntent = async () => {
        await stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
            if(paymentIntent !== undefined){
                setPaymentID(paymentIntent.id);
                switch (paymentIntent.status) {
                case "succeeded":
                setMessage("Payment succeeded!");
                break;
                case "processing":
                setMessage("Your payment is processing.");
                break;
                case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.");
                break;
                default:
                setMessage("Something went wrong.");
                break;
                }
            }
        })
    }
    retrievePaymentIntent()
    .then(() => console.log('Retrieving Payment Intent'))
    .catch((e: Error) => {
    console.log(e);
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stripe == null || elements == null) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    if(oid != null && clientSecret != null)
    {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `https://frostibuild.com/activate?oid=${oid}&PID=${paymentID}`,
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
          setMessage("Error");  
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    }

  };



  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
      />
      <PaymentElement id="payment-element"  />
      <button disabled={isLoading || stripe == null || elements == null} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message !== "" && <div id="payment-message">{message}</div>}
    </form>
  );
}