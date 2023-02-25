import Button from "@theme/Button";
import React, { useEffect, useState } from "react"
import Layout from "../theme/Layout"
import seCss from "../css/section.module.css"
import clsx from "clsx";

const SignUp = () => {

  const [checkoutUrl, setCheckoutUrl] = useState("");
  const getOid = (): string => {
    const isClient = typeof window !== "undefined"
  
    const objectId = () => {
      if (!isClient) {
        return null
      }
  
      return new URLSearchParams(window.location.search).get(
        "oid"
      );
    }
    return objectId() ?? ""
  }

  const objectId = getOid()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      return await fetch(`https://frostifu-ppe-eus-functionappc1ed.azurewebsites.net/api/StripeCheckout?objectId=${objectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*' }
      })

    }
    createPaymentIntent()
      .then(async (res) => await res.json())
      .then((data) => {
        setCheckoutUrl(data.sessionUrl)
      })
      .catch((e: Error) => {
          console.log(e);
      });
  }, []);

  return (
    <Layout canonical="/checkout" description="Gain access to standalone, cloud hosted test instances to deploy your application." title="Sign Up for Frosti">
      <section className={seCss["section--inner"]}>
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            Sign Up For Beta
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            <strong>$10.00</strong>
          </p>
          <Button
            size="xsmall"
            newTab
            onClick={() => {window.location.href = checkoutUrl}}
          >
            Checkout
          </Button>
        </div>
      </section>      
    </Layout>
  )
}

export default SignUp
